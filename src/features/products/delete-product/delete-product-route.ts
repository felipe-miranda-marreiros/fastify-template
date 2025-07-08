import { FastifyTypedInstance } from '@/shared/types'
import { deleteProductHandler } from './delete-product-handler'
import {
  deleteProductResponse,
  deleteProductSchema
} from './delete-product-validator'

export async function deleteProductRoute(fastify: FastifyTypedInstance) {
  fastify.delete(
    '/products/:id',
    {
      schema: {
        tags: ['products'],
        params: deleteProductSchema,
        response: {
          200: deleteProductResponse
        }
      }
    },
    async (req, reply) => {
      await deleteProductHandler({ productId: req.params.id })
      reply.send()
    }
  )
}
