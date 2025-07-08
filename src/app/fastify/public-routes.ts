import { authRoutes } from '@/features/auth'
import { FastifyInstance } from 'fastify'
import { productRoutes } from '../routes/product-routes'

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.register(authRoutes)
  fastify.register(productRoutes)
}
