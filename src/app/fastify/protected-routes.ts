import { authorizationMiddleware } from '@/features/auth'
import { FastifyTypedInstance } from '@/shared/types'

export async function protectedRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authorizationMiddleware.check)
}
