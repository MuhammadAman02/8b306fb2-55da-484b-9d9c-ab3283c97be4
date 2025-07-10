import { FastifyRequest, FastifyReply } from 'fastify';
import { getAllFruits } from '../services/fruit.service';
import { AppError } from '../utils/AppError';

export async function getFruitsHandler(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const fruits = await getAllFruits();
    res.status(200).send(fruits);
  } catch (error: any) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).send({ error: error.message });
    }
    return res.status(500).send({ error: 'Internal server error' });
  }
}