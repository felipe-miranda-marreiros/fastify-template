import { FastifyTypedInstance } from '@/shared/types'
import {
  updateProductParams,
  updateProductResponse,
  updateProductSchema
} from './update-product-validator'
import { updateProductHandler } from './update-product-handler'

export async function updateProductRoute(fastify: FastifyTypedInstance) {
  fastify.patch(
    '/products/:id',
    {
      schema: {
        tags: ['products'],
        params: updateProductParams,
        body: updateProductSchema,
        response: {
          200: updateProductResponse
        }
      }
    },
    async (req, reply) => {
      await updateProductHandler({
        productId: req.params.id,
        values: {
          description: req.body.description,
          price: req.body.price,
          title: req.body.title
        }
      })
      reply.send()
    }
  )
}
