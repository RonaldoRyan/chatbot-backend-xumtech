import { CorsOptions } from 'cors';

export const corsOptions: CorsOptions = {
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'x-api-key'],
};
