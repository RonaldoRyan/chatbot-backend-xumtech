import { Router } from 'express'
import { unansweredController } from '../controllers/unanswered.controller'
import { authenticateAdmin } from '@core/middlewares/auth.middleware'

const router = Router()

// Todas las rutas requieren admin / all the routes require admin authentication
router.use(authenticateAdmin)

// Listar todas las preguntas sin responder / List all unanswered questions
router.get('/', unansweredController.getAll)

// Responder una pregunta específica / Answer a specific unanswered question
router.post('/:id/answer', unansweredController.answer)

// (Opcional) Eliminar una pregunta sin responder / (Optional) Delete an unanswered question
router.delete('/:id', unansweredController.delete)

export default router
