import { createProductHandler } from './create-product-handler'
import {
  createProductResponse,
  createProductSchema
} from './create-product-validator'
import { FastifyTypedInstance } from '@/shared/types'

export async function createProductRoute(fastify: FastifyTypedInstance) {
  fastify.post(
    '/products',
    {
      schema: {
        tags: ['products'],
        body: createProductSchema,
        response: {
          201: createProductResponse
        }
      }
    },
    async (req, reply) => {
      await createProductHandler(req.body)
      reply.send()
    }
  )
}
