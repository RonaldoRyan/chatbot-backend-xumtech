export function isFallbackResponse(response: string): boolean {
  const lower = response.toLowerCase();
  return lower.includes("i'm not sure") ||
         lower.includes("i don't understand") ||
         lower.includes("i'm sorry") ||
         lower.includes("does not appear to be a coherent question") ||
         lower.includes("could you please clarify") ||
         lower.includes("doesn't form a coherent") ||
         lower.length < 10; // opcional
}
