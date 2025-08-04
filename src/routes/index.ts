import { Router } from 'express'
import chatRoutes from '../modules/chat/routes/chat.router'
import adminRoutes from '../modules/admin/routes/admin.routes'

const router = Router()

router.use('/chat', chatRoutes)
router.use('/admin', adminRoutes)

export default router
