import { prisma } from '@lib/prisma'
import * as embeddingHelper from '@core/helpers/embedding.helper'
import { AppError } from '@core/errors/appError'

export const unansweredService = {
  async getAll() {
    return prisma.unansweredQuestion.findMany({
      orderBy: { createdAt: 'desc' }
    })
  },

  async answerQuestion(id: number, answer: string) {
    const unanswered = await prisma.unansweredQuestion.findUnique({
      where: { id }
    })

    if (!unanswered) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    // **Validación de respuesta vacía o nula**
    if (!answer || !answer.trim()) {
      throw new AppError('La respuesta no puede estar vacía', 400)
    }

    // Obtener embedding de la pregunta
    const embedding = await embeddingHelper.getEmbedding(unanswered.question)

    // Guardar en tabla de preguntas respondidas
    await prisma.question.create({
      data: {
        question: unanswered.question,
        answer: answer.trim(),
        embedding
      }
    })

    // Eliminar de unanswered
    await prisma.unansweredQuestion.delete({
      where: { id }
    })
  },

  async deleteQuestion(id: number) {
    const question = await prisma.unansweredQuestion.findUnique({ where: { id } })
    if (!question) {
      throw new AppError('Pregunta no encontrada', 404)
    }

    await prisma.unansweredQuestion.delete({ where: { id } })
  }
}
