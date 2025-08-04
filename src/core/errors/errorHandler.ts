import { Request, Response, NextFunction } from 'express'
import { CustomError } from '@modules/chat/interfaces/custom.error'


/**
 * Global error handler middleware for Express.
 * 
 * Catches any error thrown in the application, logs it to the console,
 * and sends a JSON response with an appropriate HTTP status code and message.
 * If the error includes a custom status or message, those are used;
 * otherwise, it defaults to 500 Internal Server Error.
 * 
 * Middleware global para manejo de errores en Express.
 * 
 * Captura cualquier error lanzado en la aplicación, lo registra en consola
 * y envía una respuesta JSON con el código de estado HTTP y mensaje adecuados.
 * Si el error incluye un estado o mensaje personalizado, se usan esos valores;
 * de lo contrario, retorna 500 Internal Server Error por defecto.
 */

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err)

  let status = 500
  let message = 'Internal Server Error'

  if (typeof err === 'object' && err !== null) {
    const error = err as Partial<CustomError>

    if (typeof error.status === 'number') {
      status = error.status
    }

    if (typeof error.message === 'string') {
      message = error.message
    }
  }
  res.status(status).json({ message })
}
