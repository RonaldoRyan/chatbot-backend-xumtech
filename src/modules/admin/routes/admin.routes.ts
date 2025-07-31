import { Router, Request, Response } from 'express';
import {prisma } from '../../../lib/prisma';

const router = Router();

router.get('/unanswered', async (req: Request, res: Response) => {
  try {
    /**
     * Retrieves a list of unanswered questions from the database, 
     * ordered by their creation date in descending order.
     * 
     * Obtiene una lista de preguntas sin respuesta de la base de datos, 
     * ordenadas por su fecha de creación en orden descendente.
     */
    const questions = await prisma.unansweredQuestion.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching unanswered questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;
