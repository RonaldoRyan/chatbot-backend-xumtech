import { Router } from 'express';
import { chatController } from '../controllers/chat.controller';
import { validateApiKey } from '../../../core/middlewares/apiKey.middleware';

/**
 * @description
 * Initializes a new instance of the router to define and manage chat-related routes.
 * 
 * @descripción
 * Inicializa una nueva instancia del enrutador para definir y gestionar rutas relacionadas con el chat.
 */
const router = Router();

router.post('/', validateApiKey, chatController.handleUserMessage);

export default router;
