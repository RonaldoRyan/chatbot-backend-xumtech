import prisma from '../../../lib/prisma';
import stringSimilarity from 'string-similarity';
import { callCohere } from '../../../core/helpers/cohere.helper';

export const chatService = {
  async findAnswer(message: string): Promise<string> {
    const userInput = message.toLowerCase().trim();

    const allQuestions = await prisma.question.findMany();

    // Validar que haya preguntas / validate that there are questions
    if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
      
    }

    // Obtener solo preguntas en texto plano / obtain only plain text questions
    // y filtrar las que no son cadenas / and filter out those that are not strings
    const questionTexts: string[] = allQuestions
      .map((q: { question: string; }) => typeof q.question === 'string' ? q.question.toLowerCase().trim() : '')
      .filter((q: string) => q !== '');

    // Validar que haya preguntas válidas antes de usar string-similarity // validate that there are valid questions before using string-similarity
    if (questionTexts.length > 0) {
      const { bestMatch, bestMatchIndex } = stringSimilarity.findBestMatch(userInput, questionTexts);
   // Si la mejor coincidencia tiene una puntuación alta, devolver la respuesta correspondiente // If the best match has a high score, return the corresponding answer
      if (bestMatch.rating >= 0.6) {
        return allQuestions[bestMatchIndex].answer;
      }
    }

    // Si no hay coincidencia buena, usar Cohere
    const aiResponse = await callCohere(userInput);
    console.log('📡 Respuesta IA:', aiResponse);
    // Registrar pregunta no respondida
    await prisma.unansweredQuestion.create({ data: { question: message } });

    return aiResponse || 'Lo siento, no comprendí tu consulta.';
  }
};
