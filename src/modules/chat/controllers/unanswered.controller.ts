import { Request, Response, NextFunction } from 'express'
import { unansweredService } from '../services/unanswered.service'
import { AppError } from '@core/errors/appError'



export const unansweredController = {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const questions = await unansweredService.getAll()
      res.json(questions)
    } catch (error) {
      next(error)
    }
  },

  async answer(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const { answer } = req.body

    try {
      if (!answer || !answer.trim()) {
        throw new AppError('La respuesta es requerida', 400)
      }

      await unansweredService.answerQuestion(Number(id), answer)
      res.json({ success: true })
    } catch (error) {
      next(error)
    }
  },

  async delete(req: Request, res: Response) {
  const id = Number(req.params.id)
  try {
    await unansweredService.deleteQuestion(id)
    res.json({ message: 'Pregunta eliminada correctamente' })
  } catch (err: any) {
    res.status(err.status || 500).json({ message: err.message || 'Internal server error' })
  }
}


}