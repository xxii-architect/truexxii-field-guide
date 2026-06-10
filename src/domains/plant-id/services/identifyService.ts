import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";
import { extractOpenAITextOutput } from "@/domains/plant-id/utils/parseOpenAIOutput";

const PLANT_IMAGE_BUCKET = "plant-images";
const OPENAI_MODEL = "gpt-4o-mini";

function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function identifyPlantImage(file: File) {
  const supabase = createSupabaseAdminClient();
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

  const arrayBuffer = await file.arrayBuffer();
  const fileName = `plant-${Date.now()}.jpg`;

  const { error: uploadError } = await supabase.storage
    .from(PLANT_IMAGE_BUCKET)
    .upload(fileName, arrayBuffer, {
      contentType: file.type || "image/jpeg",
    });

  if (uploadError) {
    throw new Error(`Supabase upload failed: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from(PLANT_IMAGE_BUCKET)
    .getPublicUrl(fileName);

  const imageUrl = publicUrlData.publicUrl;

  const result = await client.responses.create({
    model: OPENAI_MODEL,
    input: [
      {
        role: "user",
        content: [
          {
            type: "input_image",
            image_url: `data:image/jpeg;base64,${Buffer.from(arrayBuffer).toString("base64")}`,
            detail: "auto",
          },
          {
            type: "input_text",
            text: `
Identify this plant and return ONLY a valid JSON object.

CRITICAL RULES:
- Do NOT include backticks.
- Do NOT include code fences.
- Do NOT include markdown.
- Do NOT include explanations.
- Do NOT include any text before or after the JSON.
- Return ONLY the JSON object.

The JSON object MUST look exactly like this:
{
  "species": "string or null",
  "plant_name": "string",
  "description": "string"
}

If you are unsure, use null for species and still return a description.
`
},
        ],
      },
    ],
  });

  const aiText = extractOpenAITextOutput(result);
  const cleaned = aiText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  const jsonMatch = cleaned.match(/{[\s\S]*}/);
  if (!jsonMatch) {
    throw new Error(`Could not extract JSON from model output: ${JSON.stringify(cleaned)}`);
  }

  const { species, plant_name, description } = JSON.parse(jsonMatch[0]);


  const { data: inserted, error: insertError } = await supabase
    .from("plant_history")
    .insert({
      species,
      plant_name,
      description,
      image_url: imageUrl,
      verified: false,
      created_at: new Date().toISOString(),
      latitude: null,
      longitude: null,
    })
    .select()
    .single();

  if (insertError || !inserted) {
    throw new Error(`Supabase insert failed: ${insertError?.message ?? "No record returned."}`);
  }

  return {
    id: inserted.id,
    species,
    plant_name,
    description,
    imageUrl,
    verified: inserted.verified,
    latitude: inserted.latitude,
    longitude: inserted.longitude,
  };
}
