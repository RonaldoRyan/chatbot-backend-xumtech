import { PrismaClient } from '@prisma/client'
import { getEmbedding } from '../core/helpers/embedding.helper'

const prisma = new PrismaClient()

/**
 * @file Seed data for predefined questions and answers used in the chatbot system.
 *
 * @description
 * EN: Contains a list of predefined questions and answers for the chatbot's initial setup.
 * ES: Contiene una lista de preguntas y respuestas predefinidas para la configuración inicial del chatbot.
 *
 * @usage
 * EN: This data is used to populate the database with default questions and answers.
 * ES: Estos datos se utilizan para poblar la base de datos con preguntas y respuestas predeterminadas.
 */
const questions = [
  {
    question: '¿Cuál es tu propósito principal?',
    answer:
      'Estoy diseñado para responder preguntas como parte de una prueba técnica de chatbot evaluativo.',
  },
  {
    question: '¿Qué tecnologías usas en tu arquitectura?',
    answer:
      'Mi backend utiliza Node.js, Express, TypeScript, Prisma y SQLite. El frontend está hecho en Next.js con React y Tailwind CSS.',
  },
  {
    question: '¿Quién desarrolló este sistema?',
    answer:
      'Fui desarrollado por Ronaldo Ryan Serrano como parte de una prueba técnica para Xumtech.',
  },
  {
    question: '¿Tienes conexión con alguna API de inteligencia artificial?',
    answer:
      'Sí, utilizo la API de Cohere para generar respuestas cuando no tengo una respuesta predefinida.',
  },
  {
    question: '¿Dónde se almacenan tus preguntas y respuestas?',
    answer:
      'Uso una base de datos SQLite conectada mediante Prisma ORM para almacenar preguntas predefinidas y no respondidas.',
  },
  {
    question: '¿Cómo decides si respondes tú o la IA?',
    answer:
      'Comparo la similitud de tu mensaje con mis preguntas almacenadas. Si no hay coincidencia suficiente, consulto con Cohere.',
  },
  {
    question: '¿Puedes adaptarte o aprender nuevas preguntas?',
    answer:
      'En esta versión aún no aprendo automáticamente, pero registro cada pregunta no respondida para entrenamiento futuro.',
  },
  {
    question: '¿Qué pasa si no entiendo tu pregunta?',
    answer:
      'Intento generar una respuesta con inteligencia artificial. Si aún así no puedo, te responderé con un mensaje de fallback.',
  },
  {
    question: '¿Este sistema está listo para producción?',
    answer:
      'No completamente. Fue desarrollado como un MVP funcional para una evaluación técnica, pero tiene potencial de escalabilidad.',
  },
  {
    question: '¿Cómo puedo entrenarte con nuevas respuestas?',
    answer:
      'Actualmente solo el backend puede registrar preguntas nuevas. En futuras versiones se podrá entrenar desde la interfaz de usuario.',
  },
]

/**
 * Inserts questions into the database with their embeddings.
 * Utilizes the `getEmbedding` function to generate embeddings for each question.
 */
export async function main() {
  for (const q of questions) {
    const embedding = await getEmbedding(q.question) // ← obtenemos embedding desde Cohere u otra IA

    await prisma.question.upsert({
      where: { question: q.question },
      update: {}, // no actualizamos si ya existe
      create: {
        question: q.question,
        answer: q.answer,
        embedding: embedding as any, // Asegúrate de que el tipo en Prisma sea JSON
      },
    })

    console.log(`✅ Pregunta insertada: ${q.question}`)
  }

  console.log('✔️ Seed ejecutado sin duplicados')
}

main()
  .catch((e) => {
    console.error('❌ Error al ejecutar el seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
