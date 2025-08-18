// src/core/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from '@modules/auth/interfaces/auth.interface'
import jwt from 'jsonwebtoken'



export function authenticateAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const secret = process.env.JWT_SECRET || 'tu_secreto_default'
    const payload = jwt.verify(token, secret) as JwtPayload

    if (payload.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' })
    }

    req.user = { id: payload.userId, role: payload.role } 

    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}
