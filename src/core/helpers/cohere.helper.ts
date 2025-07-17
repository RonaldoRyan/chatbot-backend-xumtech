import { CohereClientV2 } from 'cohere-ai';

const cohere = new CohereClientV2({
  token: process.env.API_KEY?.trim() || '',
});

/**
 * Calls the Cohere API to generate a response based on the provided prompt.
 * 
 * Llama a la API de Cohere para generar una respuesta basada en el prompt proporcionado.
 */


// @param prompt - The input prompt to send to the Cohere API. / El prompt de entrada para enviar a la API de Cohere.
export async function callCohere(prompt: string): Promise<string | null> {
  try {
    const response = await cohere.chat({
      model: 'command-a-03-2025',
      messages: [
        { role: 'user', content: prompt }
      ],
    });

    // Check if the response contains a message and its content / Verifica si la respuesta contiene un mensaje y su contenido
    const content = response.message?.content;

    let aiMessage: string | null = null;
   // If content is an array, extract text from each item / Si el contenido es un array, extrae el texto de cada elemento
    if (Array.isArray(content)) {
      const texts = content
      // Filter out non-text items and join the text content / Filtra los elementos que no son texto y une el contenido de texto
        .filter(item => item.type === 'text' && typeof item.text === 'string')
        .map(item => item.text);
//
      aiMessage = texts.join(' ').trim();
    }

    
    return aiMessage;

  } catch (error: any) {
    console.error(' Error al llamar a Cohere:', error.message || error);
    return null;
  }
}
