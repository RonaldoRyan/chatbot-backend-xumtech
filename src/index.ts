import express from 'express'
import cors from 'cors'
import routes from './routes'
import unansweredRoutes from './modules/chat/routes/unanswereds.route'
import { errorHandler } from './core/errors/errorHandler'
import { authController } from '@modules/auth/controllers/auth.controller'  
import { corsOptions } from './config/cors'
import { config } from 'dotenv'

config()

const app = express()
const PORT = process.env.PORT || 3001

// Función async para arrancar app después de seed
async function startServer() {
  try {

    // Middlewares
    app.use(cors(corsOptions))
    app.use(express.json())

    // Rutas principales
    app.use('/api', routes)
    

    // Manejador de errores
    app.use(errorHandler)

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`)
    })
  } catch (error) {
    console.error('Error ejecutando seed o arrancando servidor:', error)
    process.exit(1) // Salir con error
  }
}

// Ejecutar arranque
startServer()
