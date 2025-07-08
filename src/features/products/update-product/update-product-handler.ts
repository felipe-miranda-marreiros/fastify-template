import { NotFoundError } from '@/shared/errors'
import { log } from '@/infrastructure/logger'
import { productRepository } from '@/infrastructure/repositories'

interface UpdateProduct {
  productId: number
  values: {
    title: string
    price: number
    description: string
  }
}

export async function updateProductHandler({
  productId,
  values
}: UpdateProduct): Promise<void> {
  const product = await productRepository.findById(productId)

  if (!product) {
    log.warn('Produto com id não foi encontrado', productId)
    throw new NotFoundError('Produto não foi encontrado')
  }

  await productRepository.updateById(productId, values)
}
