import pino from 'pino'

const isTestEnv = process.env.NODE_ENV === 'test'

export const log = pino(
  isTestEnv
    ? { level: 'silent' }
    : {
        level: 'info',
        timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`,
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true
          }
        },
        redact: {
          paths: ['[0].password', 'password'],
          censor: '[REDACTED]'
        }
      }
)
