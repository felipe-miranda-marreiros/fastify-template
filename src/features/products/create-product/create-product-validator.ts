import z from 'zod'

export const createProductSchema = z.object({
  title: z.string().describe('Titulo do produto'),
  description: z.string().describe('Descrição do produto'),
  price: z.number().describe('Valor do produto')
})

export const createProductResponse = z.void()
