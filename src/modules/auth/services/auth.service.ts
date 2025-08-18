import { prisma } from '@lib/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppError } from '@core/errors/appError'
import { JwtPayload } from '@modules/auth/interfaces/auth.interface'


export const authService = {
  async login(email: string, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new AppError('Credenciales inválidas', 401)
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new AppError('Credenciales inválidas', 401)
    }

    const payload: JwtPayload = { userId: user.id, role: user.role }
    const secret = process.env.JWT_SECRET || 'tu_secreto_default'

    return jwt.sign(payload, secret, { expiresIn: '1h' })

    
  }
}


