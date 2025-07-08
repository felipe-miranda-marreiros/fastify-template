import { eq } from 'drizzle-orm'
import { db, products } from '../database'
import { Product } from '@/entities/products'

interface ProductBase {
  title: string
  price: number
  description: string
}

async function save(product: ProductBase): Promise<void> {
  await db.insert(products).values(product)
}

async function findById(id: number): Promise<Product | null> {
  const product = await db.select().from(products).where(eq(products.id, id))
  if (product.length === 0) return null
  return product[0]
}

async function updateById(id: number, values: ProductBase): Promise<void> {
  await db.update(products).set(values).where(eq(products.id, id))
}

async function deleteById(id: number): Promise<void> {
  await db.delete(products).where(eq(products.id, id))
}

export const productRepository = {
  save,
  findById,
  updateById,
  deleteById
}
