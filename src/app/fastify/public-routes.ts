import { authRoutes } from '@/features/auth'
import { FastifyInstance } from 'fastify'

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes)
}
