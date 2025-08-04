import { chatService } from '@modules/chat/services/chat.service'
jest.mock('@lib/prisma')
import { prisma } from '@lib/prisma'
import * as cohereHelper from '@core/helpers/cohere.helper'
import * as embeddingHelper from '@core/helpers/embedding.helper'
import * as fallbackHelper from '@utils/aiFallback'
import { Prisma, Question } from '@prisma/client'

describe('chatService.findAnswer', () => {
  afterEach(() => jest.clearAllMocks())

  it('debe retornar la respuesta correcta desde el seed si hay match real en BD', async () => {
    const result = await chatService.findAnswer('¿Cuál es tu propósito principal?')
    expect(result).toBe(
      'Estoy diseñado para responder preguntas como parte de una prueba técnica de chatbot evaluativo.'
    )
  })

  it('debe llamar a fallback si falla getEmbedding', async () => {
    jest.spyOn(embeddingHelper, 'getEmbedding').mockRejectedValue(new Error('Error'))
    jest.spyOn(cohereHelper, 'callCohere').mockResolvedValue('fallback response')
    jest.spyOn(fallbackHelper, 'isFallbackResponse').mockReturnValue(false)

    const result = await chatService.findAnswer('mensaje')
    expect(result).toBe('fallback response')
  })

  it('debe guardar pregunta sin respuesta si no hay match', async () => {
    jest.spyOn(embeddingHelper, 'getEmbedding').mockResolvedValue([0.1, 0.2, 0.3])
    jest.spyOn(embeddingHelper, 'cosineSimilarity').mockReturnValue(0.1)
    jest.spyOn(cohereHelper, 'callCohere').mockResolvedValue('respuesta fallback')
    jest.spyOn(fallbackHelper, 'isFallbackResponse').mockReturnValue(false)

    const mockQuestion: Question = {
      id: 1,
      question: 'otro',
      answer: 'respuesta',
      embedding: [0.9, 0.9, 0.9] as Prisma.JsonValue,
    }

    ;(prisma.question.findMany as jest.Mock).mockResolvedValue([mockQuestion])
    ;(prisma.unansweredQuestion.create as jest.Mock).mockResolvedValue({
      id: 123,
      question: 'no match',
      aiAnswer: 'respuesta fallback',
      createdAt: new Date(),
    })

    const result = await chatService.findAnswer('no match')
    expect(result).toBe('respuesta fallback')
  })

  it('debe llamar a fallback si no hay preguntas en BD', async () => {
    jest.spyOn(embeddingHelper, 'getEmbedding').mockResolvedValue([0.1, 0.2, 0.3])
    ;(prisma.question.findMany as jest.Mock).mockResolvedValue([])
    jest.spyOn(cohereHelper, 'callCohere').mockResolvedValue('fallback vacío')
    jest.spyOn(fallbackHelper, 'isFallbackResponse').mockReturnValue(false)

    const result = await chatService.findAnswer('sin datos')
    expect(result).toBe('fallback vacío')
  })
})
