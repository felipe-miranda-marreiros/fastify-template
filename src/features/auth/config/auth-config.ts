import { createAuthMiddleware, APIError } from 'better-auth/api'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import * as schema from '@/infrastructure/database/schemas/schemas'
import { signUpValidator } from '../routes/auth-validator'
import { db } from '@/infrastructure/database'
import { log } from '@/infrastructure/logger'
import { betterAuth } from 'better-auth'
import { ENV } from '@/shared/config'

export const auth = betterAuth({
  trustedOrigins: [ENV.BETTER_TRUSTED_ORIGINS],
  emailAndPassword: {
    enabled: true
  },
  databaseHooks: {
    user: {
      update: {
        before: async (user) => {
          log.info('Updating user', user)
        },
        after: async (user) => {
          log.info('User updated succesfully', user)
        }
      },
      create: {
        before: async (user) => {
          log.info('Creating user', user)
        },
        after: async (user) => {
          log.info('Use created', user)
        }
      }
    }
  },
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === '/sign-up/email') {
        const resut = signUpValidator.safeParse(ctx.body)
        if (resut.error) {
          throw new APIError('BAD_REQUEST', {
            message: JSON.stringify(resut.error.issues)
          })
        }
      }
    })
  },
  advanced: {
    database: {
      useNumberId: true,
      generateId: false
    }
  },
  session: {
    expiresIn: 30 * 24 * 60 * 60
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema
  })
})
