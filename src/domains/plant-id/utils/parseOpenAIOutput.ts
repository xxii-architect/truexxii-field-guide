type OpenAIContentItem = { text?: string } | unknown;
type OpenAIOutputItem = {
  content?: OpenAIContentItem[];
  text?: string;
  output_text?: string;
} | unknown;

type OpenAIResult = {
  output?: OpenAIOutputItem[] | string;
} & Record<string, unknown>;

export function extractOpenAITextOutput(result: unknown): string {
  if (!result || typeof result !== "object") {
    return "No result returned.";
  }

  const { output } = result as OpenAIResult;
  if (typeof output === "string") {
    return output;
  }

  if (!Array.isArray(output)) return JSON.stringify(output)

  const arr = output as unknown[]
  for (const item of arr) {
    if (!item || typeof item !== 'object') continue

    const obj = item as Record<string, unknown>
    if (Array.isArray(obj.content)) {
      for (const ci of obj.content) {
        if (typeof ci === 'object' && ci !== null) {
          const maybe = ci as Record<string, unknown>
          if (typeof maybe.text === 'string') return maybe.text
        }
      }
    }

    if (typeof obj.text === 'string') return obj.text
    if (typeof obj.output_text === 'string') return obj.output_text
  }

  return JSON.stringify(output);
}
