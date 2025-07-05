import { User } from '@/entities/users/models/user'
import { Environment } from '@/shared/config/env'

export {}

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ProcessEnv extends Environment {}
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: User
  }
}
