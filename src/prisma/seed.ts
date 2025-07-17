import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function main() {
  // Verifica si ya hay preguntas en la BD
  const count = await prisma.question.count();

  if (count > 0) {
    console.log('✅ Preguntas ya existen en la base de datos. Seed no se ejecuta.');
    return;
  }

  // Si no hay preguntas, insertar las predefinidas
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

  console.log('✅ Preguntas insertadas en la base de datos.');
}
