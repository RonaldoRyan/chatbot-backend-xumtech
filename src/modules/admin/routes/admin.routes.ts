import { Router } from 'express'
import unansweredRoutes from '@modules/chat/routes/unanswereds.route'

const router = Router()

// Todas las rutas de unanswered quedan bajo /admin/unanswered
router.use('/unanswered', unansweredRoutes)

export default router
