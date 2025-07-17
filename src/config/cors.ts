import { CorsOptions } from 'cors';

export const corsOptions = {
  origin: [
    'http://localhost:3000', // para desarrollo local
    'https://chatbot-frontend-xumtech.vercel.app', // dominio de Vercel (ajusta si es otro)
    'https://chatbot-frontend-xumtech-7l7k.vercel.app', // dominio de build temporal
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
  credentials: false,
};
