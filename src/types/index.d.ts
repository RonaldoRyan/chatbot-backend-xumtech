import * as express from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
        role: string
        // Puedes agregar más campos si usas
      }
    }
  }
}
