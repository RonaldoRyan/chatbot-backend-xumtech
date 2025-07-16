import { Request, Response, NextFunction } from 'express';



/**
 * Handles errors that occur during the request-response cycle.
 * Logs the error to the console and sends an appropriate HTTP response.
 * 
 * Maneja los errores que ocurren durante el ciclo de solicitud-respuesta.
 * Registra el error en la consola y envía una respuesta HTTP adecuada.
 * 
 * @param err - The error object containing details about the error. / El objeto de error que contiene detalles sobre el error.
 * @param _req - The incoming HTTP request object (unused). / El objeto de solicitud HTTP entrante (no utilizado).
 * @param res - The HTTP response object used to send the error response. / El objeto de respuesta HTTP utilizado para enviar la respuesta de error.
 * @param _next - The next middleware function in the stack (unused). / La siguiente función de middleware en la pila (no utilizada).
 */
export function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
}
