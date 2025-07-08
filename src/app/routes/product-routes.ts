import { createProductRoute } from '@/features/products/create-product/create-product-route'
import { deleteProductRoute } from '@/features/products/delete-product/delete-product-route'
import { updateProductRoute } from '@/features/products/update-product/update-product-route'
import { FastifyInstance } from 'fastify'

export function productRoutes(fastify: FastifyInstance) {
  fastify.register(createProductRoute)
  fastify.register(updateProductRoute)
  fastify.register(deleteProductRoute)
}
