import { authorizationMiddleware } from '@/features/auth'
import { FastifyTypedInstance } from '@/shared/types'
import z from 'zod'

export async function protectedRoutes(fastify: FastifyTypedInstance) {
  fastify.addHook('onRequest', authorizationMiddleware.check)
  fastify.get(
    '/products',
    {
      schema: {
        response: {
          200: z.object({
            name: z.string()
          })
        }
      }
    },
    async (req, reply) => {
      reply.send({ name: 'asdawdawd' })
    }
  )
}
