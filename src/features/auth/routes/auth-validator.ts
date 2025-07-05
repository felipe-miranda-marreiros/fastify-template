import { z } from 'zod'

export const signUpValidator = z.object({
  name: z.string().trim().nonempty('Nome é obrigatório'),
  email: z
    .string()
    .trim()
    .nonempty('E-mail é obrigatório')
    .email('E-mail inválido'),
  password: z.string().trim().nonempty('Senha é obrigatório')
})
