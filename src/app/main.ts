import { ENV } from '@/shared/config'
import { fastify } from './fastify'

const main = async () => {
  try {
    await fastify.listen({ port: ENV.APP_PORT, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

main()
