import { Request, Response, NextFunction } from 'express';
import { chatService } from '../services/chat.service';
import { ChatMessageSchema } from '../dtos/chat.dto';

/**
 * Handles user messages by validating the input, processing the message, 
 * and returning a response or an error.
 * 
 * Maneja los mensajes de los usuarios validando la entrada, procesando el mensaje 
 * y devolviendo una respuesta o un error.
 * 
 */
export const chatController = {
  async handleUserMessage(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const parsed = ChatMessageSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({ message: 'Input inválido', errors: parsed.error.flatten() });
      }

      const { message } = parsed.data;
      const response = await chatService.findAnswer(message);
      res.json({ response });
    } catch (err) {
      next(err); 
    }
  }
};
