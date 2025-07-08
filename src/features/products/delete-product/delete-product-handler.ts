import { productRepository } from '@/infrastructure/repositories'

interface DeleteProduct {
  productId: number
}

export async function deleteProductHandler({
  productId
}: DeleteProduct): Promise<void> {
  await productRepository.deleteById(productId)
}
