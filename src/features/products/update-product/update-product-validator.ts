import z from 'zod'

export const updateProductParams = z.object({
  id: z.coerce.number().int().positive()
})

export const updateProductSchema = z.object({
  title: z.string().trim().nonempty(),
  description: z.string().trim().nonempty(),
  price: z.number().nonnegative()
})

export const updateProductResponse = z.void()
