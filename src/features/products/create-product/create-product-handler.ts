import { productRepository } from '@/infrastructure/repositories'

interface CreateProduct {
  title: string
  price: number
  description: string
}

export async function createProductHandler(
  product: CreateProduct
): Promise<void> {
  await productRepository.save(product)
}
