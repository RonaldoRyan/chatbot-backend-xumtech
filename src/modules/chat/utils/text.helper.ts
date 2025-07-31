// English: Normalizes text by converting to lowercase, trimming spaces, and removing punctuation.
// Español: Normaliza el texto convirtiéndolo a minúsculas, eliminando espacios y quitando signos de puntuación.
export function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/[¿?¡!.,;]/g, '');
}
