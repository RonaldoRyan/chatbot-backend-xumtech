import prisma from '../../../lib/prisma';
import stringSimilarity from 'string-similarity';
import { callCohere } from '../../../core/helpers/cohere.helper';

function normalize(text: string): string {
  return text.toLowerCase().trim().replace(/[¿?¡!.,;]/g, '');
}

export const chatService = {
  async findAnswer(message: string): Promise<string> {
    const normalizedInput = normalize(message);

    const allQuestions = await prisma.question.findMany();
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      const aiFallback = await callCohere(normalizedInput);
      return aiFallback || 'Lo siento, no encontré una respuesta adecuada.';
    }

    const normalizedQuestions = allQuestions.map(q => normalize(q.question));
    const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(normalizedInput, normalizedQuestions);

    if (bestMatch.rating >= 0.85) {
      return allQuestions[bestMatchIndex].answer;
    }

    // IA fallback
    const aiResponse = await callCohere(message);
    console.log('📡 Respuesta IA:', aiResponse);

    await prisma.unansweredQuestion.create({
      data: {
        question: message,
        aiAnswer: aiResponse || 'Sin respuesta'
      }
    });

    return aiResponse || 'Lo siento, no comprendí tu consulta.';
  }
};
