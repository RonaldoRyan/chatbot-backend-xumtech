import { CohereClientV2 } from 'cohere-ai'

export const cohereClient = new CohereClientV2({
  token: process.env.API_KEY?.trim() || '',
})

/**
 * Calls the Cohere API to generate a response based on the provided prompt.
 *
 * Llama a la API de Cohere para generar una respuesta basada en el prompt proporcionado.
 */

// @param prompt - The input prompt to send to the Cohere API. / El prompt de entrada para enviar a la API de Cohere.
export async function callCohere(prompt: string): Promise<string | null> {
  try {
    const response = await cohereClient.chat({
      model: 'command-a-03-2025',
      messages: [{ role: 'user', content: prompt }],
    })

    // Check if the response contains a message and its content / Verifica si la respuesta contiene un mensaje y su contenido
    const content = response.message?.content

    let aiMessage: string | null = null
    // If content is an array, extract text from each item / Si el contenido es un array, extrae el texto de cada elemento
    if (Array.isArray(content)) {
      const texts = content
        // Filter out non-text items and join the text content / Filtra los elementos que no son texto y une el contenido de texto
        .filter((item) => item.type === 'text' && typeof item.text === 'string')
        .map((item) => item.text)

      aiMessage = texts.join(' ').trim()
    }

    return aiMessage
  } catch (error: any) {
    console.error('Error al llamar a Cohere:', error.message || error)
    return null
  }
}

/**
 * Obtains the embedding vector for a given text using Cohere embeddings.
 *
 * Obtiene el vector embedding para un texto dado usando los embeddings de Cohere.
 *
 * @param text - Texto para generar el embedding
 * @returns Vector numérico del embedding o array vacío en caso de error
 */
export async function getEmbedding(text: string): Promise<number[]> {
  try {
    const response = await cohereClient.embed({
      model: 'embed-english-v3.0',
      inputType: 'search_query',
      texts: [text],
      embeddingTypes: ['float'], // ← requerido por V2
    })

    const embedding = response.embeddings?.float?.[0]
    if (!embedding) {
      console.error('No se recibió embedding:', response)
      return []
    }

    return embedding
  } catch (error: any) {
    console.error('Error al generar embedding:', error.message || error)
    return []
  }
}
