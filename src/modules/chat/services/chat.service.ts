import { prisma } from '../../../lib/prisma';
import { callCohere } from '../../../core/helpers/cohere.helper';
import { getEmbedding, cosineSimilarity } from '../../../core/helpers/embedding.helper';
import { normalize } from '../utils/text.helper';
import { isFallbackResponse } from '../utils/aiFallback'; 

export const chatService = {
  // EN: Finds the best answer for a given message using embeddings and fallback AI responses.
  // ES: Encuentra la mejor respuesta para un mensaje usando embeddings y respuestas de AI de respaldo.
  async findAnswer(message: string): Promise<string> {
    const normalizedInput = normalize(message);

    let inputEmbedding: number[];
    try {
      inputEmbedding = await getEmbedding(normalizedInput);
    } catch (error) {
      // EN: Calls fallback AI if embedding generation fails.
      // ES: Llama a la AI de respaldo si falla la generación de embeddings.
      const fallback = await callCohere(message);

      return isFallbackResponse(fallback ?? '')
        ? 'Lo siento, no comprendí tu consulta.'
        : fallback || 'Lo siento, no pude procesar tu consulta.';
    }

    // EN: Retrieves all stored questions with embeddings from the database.
    // ES: Recupera todas las preguntas almacenadas con embeddings de la base de datos.
    const allQuestions = await prisma.question.findMany({
      select: { id: true, question: true, answer: true, embedding: true }
    });

    if (!allQuestions || allQuestions.length === 0) {
      // EN: Calls fallback AI if no questions are found.
      // ES: Llama a la AI de respaldo si no se encuentran preguntas.
      const aiFallback = await callCohere(normalizedInput);

      return isFallbackResponse(aiFallback ?? '')
        ? 'Lo siento, no encontré una respuesta adecuada.'
        : aiFallback || 'Lo siento, no encontré una respuesta adecuada.';
    }

    let bestMatchIndex = -1;
    let bestScore = -Infinity;

    // EN: Calculates cosine similarity to find the best matching question.
    // ES: Calcula la similitud coseno para encontrar la pregunta más adecuada.
    for (let i = 0; i < allQuestions.length; i++) {
      const storedEmbedding = allQuestions[i].embedding as number[] | null;
      if (!storedEmbedding) continue;

      const score = cosineSimilarity(inputEmbedding, storedEmbedding);
      if (score > bestScore) {
        bestScore = score;
        bestMatchIndex = i;
      }
    }

    // EN: Returns the best match if similarity score is high enough.
    // ES: Devuelve la mejor coincidencia si el puntaje de similitud es suficientemente alto.
    if (bestScore >= 0.75 && bestMatchIndex !== -1) {
      return allQuestions[bestMatchIndex].answer;
    }

    // EN: Calls fallback AI and saves unanswered questions to the database.
    // ES: Llama a la AI de respaldo y guarda preguntas sin respuesta en la base de datos.
    const aiResponse = await callCohere(message);

    await prisma.unansweredQuestion.create({
      data: {
        question: message,
        aiAnswer: aiResponse || 'Sin respuesta'
      }
    });

    return isFallbackResponse(aiResponse ?? '')
      ? 'Lo siento, no comprendí tu consulta.'
      : aiResponse || 'Lo siento, no comprendí tu consulta.';
  },

  // EN: Saves embeddings for a specific question in the database.
  // ES: Guarda embeddings para una pregunta específica en la base de datos.
  async saveEmbeddingForQuestion(questionId: number, questionText: string): Promise<void> {
    const normalized = normalize(questionText);
    const embedding = await getEmbedding(normalized);

    await prisma.question.update({
      where: { id: questionId },
      data: { embedding }
    });
  }
};
