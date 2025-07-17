import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Inserts a predefined set of questions and answers into the database.
 * Utilizes Prisma to create entries in the `question` table.
 * Logs a success message upon completion.
 *
 * Inserta un conjunto predefinido de preguntas y respuestas en la base de datos.
 * Utiliza Prisma para crear entradas en la tabla `question`.
 * Muestra un mensaje de éxito al finalizar.
 *
 * @async
 * @function main
 * @returns {Promise<void>} A promise that resolves when all questions are inserted.
 */
async function main() {
  // 1. Elimina todas las preguntas existentes
  await prisma.question.deleteMany();

  // 2. Inserta las nuevas preguntas
  const questions = [
    { question: '¿Cuál es tu nombre?', answer: 'Soy un bot conversacional simple.' },
    { question: '¿Qué puedes hacer?', answer: 'Puedo responder preguntas predefinidas.' },
    { question: '¿Cómo te entrenaron?', answer: 'Fui entrenado con un conjunto de datos fijo.' },
    { question: '¿Cuántos años tienes?', answer: 'No tengo edad, solo soy código.' },
    { question: '¿Dónde estás alojado?', answer: 'En un servidor backend Express con SQLite.' },
    { question: '¿Eres inteligente?', answer: 'Solo un poco, respondo 10 preguntas...o puede que un poco más.' },
    { question: '¿Quién te creó?', answer: 'Fui desarrollado como prueba técnica por Ronaldo Ryan Serrano.' },
    { question: '¿Puedes aprender?', answer: 'En esta versión no, pero en un futuro sí.' },
    { question: '¿En que lenguaje estas programado?', answer: 'Mi Backend está creado con Node.js, TypeScript, Express.js, SQLite y Prisma. El Frontend usa React, Next.js y Tailwind.' },
    { question: '¿Tienes interfaz?', answer: 'Sí, tengo un chat en la web.' }
  ];

  for (const q of questions) {
    await prisma.question.create({ data: q });
  }

  console.log('✅ Preguntas actualizadas e insertadas');
}

main().finally(() => prisma.$disconnect());
