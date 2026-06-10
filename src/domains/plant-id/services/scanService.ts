export type PlantIdentificationResponse = {
  id: number;
  species: string;
  plant_name: string;
  description: string;
  imageUrl: string;
  verified: boolean;
  latitude: number | null;
  longitude: number | null;
};

export async function identifyPlantScan(image: File): Promise<PlantIdentificationResponse> {
  const formData = new FormData();
  formData.append("image", image);

  const res = await fetch("/api/identify", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorBody = await res.text();
    throw new Error(`Identify request failed: ${res.status} ${errorBody}`);
  }

  const data = (await res.json()) as PlantIdentificationResponse;
  return data;
}
