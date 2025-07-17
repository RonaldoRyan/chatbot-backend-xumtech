import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './core/errors/errorHandler';
import { corsOptions } from './config/cors';
import { config } from 'dotenv';

config(); 


const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());

// Rutas principales / principal routes
app.use('/api', routes);

// Manejador de errores / error handler
app.use(errorHandler);

// Inicializar servidor /  start server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`); // Server running on port
});
