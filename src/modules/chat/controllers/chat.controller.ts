import { Request, Response, NextFunction } from 'express'
import { chatService } from '../services/chat.service'
import { ChatMessageSchema } from '../dtos/chat.dto'

/**
 * Handles user messages by validating the input, processing the message,
 * and returning a response or an error.
 *
 * Maneja los mensajes de los usuarios validando la entrada, procesando el mensaje
 * y devolviendo una respuesta o un error.
 */
export const chatController = {
  async handleUserMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    // Log incoming request / Registrar la petición entrante
    console.log('📩 Petición recibida en chatController.handleUserMessage:', req.body)

    try {
      // Validate input / Validar entrada
      const parsed = ChatMessageSchema.safeParse(req.body)

      if (!parsed.success) {
        // Return error for invalid input / Devolver error por entrada inválida
        return res.status(400).json({
          message: 'Input inválido',
          errors: parsed.error.flatten(),
        })
      }

      // Extract message and find response / Extraer mensaje y buscar respuesta
      const { message } = parsed.data
      const response = await chatService.findAnswer(message)

      // Send response / Enviar respuesta
      res.json({ response })
    } catch (err) {
      // Handle errors / Manejar errores
      next(err)
    }
  },
}
