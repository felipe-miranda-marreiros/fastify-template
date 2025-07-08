import z from 'zod'

export const deleteProductSchema = z.object({
  id: z.coerce.number().int().positive()
})

export const deleteProductResponse = z.void()
