import { z } from 'zod'

const envSchema = z.object({
  // Better Auth
  BETTER_AUTH_SECRET: z.string().nonempty(),
  BETTER_AUTH_URL: z.string().nonempty(),
  BETTER_TRUSTED_ORIGINS: z.string().nonempty(),

  // PostgreSQL
  POSTGRES_CONTAINER_NAME: z.string().nonempty(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  POSTGRES_PORT: z.coerce.number().int().min(1).max(65535),

  // DB Connection
  DATABASE_URL: z.string().nonempty(),

  // App
  APP_CONTAINER_NAME: z.string().nonempty(),
  APP_ENV: z.enum(['development', 'production', 'test', 'local']),
  APP_PORT: z.coerce.number().int().min(1).max(65535),

  // JWT
  JWT_SECRET: z.string().min(1, 'JWT_SECRET cannot be empty'),

  // PG Admin
  PGADMIN_CONTAINER_NAME: z.string().nonempty(),
  PGADMIN_DEFAULT_EMAIL: z.string().email().nonempty(),
  PGADMIN_DEFAULT_PASSWORD: z.string().nonempty(),
  PGADMIN_PORT: z.coerce.number().int().min(1).max(65535),

  // REDIS
  REDIS_URL: z.string().nonempty(),
  REDIS_PORT: z.string().nonempty(),
  REDIS_CONTAINER_NAME: z.string().nonempty(),

  // REDIS INSIGHT
  REDIS_INSIGHT_CONTAINER_NAME: z.string().nonempty(),
  REDIS_INSIGHT_PORT: z.string().nonempty(),

  // PERMIT_IO
  PERMIT_CONTAINER_NAME: z.string().nonempty(),
  PERMIT_TOKEN: z.string().nonempty(),
  PERMIT_PDP: z.string().nonempty(),
  PERMIT_PORT: z.string().nonempty()
})

export const ENV = envSchema.parse(process.env)

export type Environment = z.infer<typeof envSchema>
