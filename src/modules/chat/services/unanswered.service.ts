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

    const embedding = await embeddingHelper.getEmbedding(unanswered.question)

    await prisma.question.create({
      data: {
        question: unanswered.question,
        answer,
        embedding
      }
    })

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
