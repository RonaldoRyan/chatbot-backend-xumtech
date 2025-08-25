import { PrismaClient } from '@prisma/client'
import { getEmbedding } from '../core/helpers/embedding.helper'

const prisma = new PrismaClient()

async function main() {
  const questions = await prisma.question.findMany()
  for (const q of questions) {
    try {
      const embedding = await getEmbedding(q.question)
      await prisma.question.update({
        where: { id: q.id },
        data: { embedding }
      })
      console.log(`✅ Embedding actualizado para: ${q.question}`)
    } catch (error) {
      console.error(`❌ Error con la pregunta: ${q.question}`)
    }
  }
  await prisma.$disconnect()
}

main().catch(console.error)
