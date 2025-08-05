import { cohereClient } from './cohere.helper'

/**
 * Retrieves the embedding vector for a given text using the Cohere API.
 * Obtiene el vector de embedding para un texto dado utilizando la API de Cohere.
 *
 * @param text - The input text to generate the embedding for.
 *               El texto de entrada para generar el embedding.
 * @returns A promise that resolves to an array of numbers representing the embedding vector.
 *          Una promesa que resuelve a un arreglo de números que representa el vector de embedding.
 * @throws Throws an error if the embedding cannot be retrieved from the Cohere response.
 *         Lanza un error si no se puede obtener el embedding de la respuesta de Cohere.
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await cohereClient.embed({
      model: 'small',
      inputType: 'search_query',
      texts: [text],
      embeddingTypes: ['float'],
    })

    if (
      !response.embeddings ||
      !response.embeddings.float ||
      response.embeddings.float.length === 0
    ) {
      throw new Error('No se pudo obtener el embedding de la respuesta de Cohere.')
    }

    return response.embeddings.float[0]
  } catch (error) {
    console.error('Error al obtener embedding:', error)
    throw error
  }
}

export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0)
  const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0))
  const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0))
  return dot / (magA * magB)
}
