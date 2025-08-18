import { Router } from 'express'
import chatRoutes from '../modules/chat/routes/chat.router'
import adminRoutes from '../modules/admin/routes/admin.routes'
import authRoutes from '../modules/auth/routes/auth.route'

const router = Router()


router.use('/auth', authRoutes)
router.use('/chat', chatRoutes)
router.use('/admin', adminRoutes)

export default router
