import express from 'express';
import cors from 'cors';
import routes from './routes';
import { main as seed } from './prisma/seed';
import { errorHandler } from './core/errors/errorHandler';
import { corsOptions } from './config/cors';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;

// Función async para arrancar app después de seed
async function startServer() {
  try {
    console.log('Ejecutando seed de base de datos...');
    await seed();
    console.log('Seed ejecutado correctamente.');

    // Middlewares
    app.use(cors(corsOptions));
    app.use(express.json());

    // Rutas principales
    app.use('/api', routes);

    // Manejador de errores
    app.use(errorHandler);

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });

  } catch (error) {
    console.error('Error ejecutando seed o arrancando servidor:', error);
    process.exit(1); // Salir con error
  }
}

// Ejecutar arranque
startServer();
