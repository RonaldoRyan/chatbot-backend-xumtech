import { Request, Response, NextFunction } from 'express'
import { authService } from '../services/auth.service'

export const authController = {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body
      const token = await authService.login(email, password)
      res.json({ token })
    } catch (error) {
      next(error) // lo enviamos al errorHandler global
    }
  }
}
