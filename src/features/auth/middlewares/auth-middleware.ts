import { FastifyReply, FastifyRequest } from 'fastify'
import { User } from '@/entities/users/models/user'
import { auth } from '../config/auth-config'

async function check(req: FastifyRequest, reply: FastifyReply) {
  const headers = new Headers()

  Object.entries(req.headers).forEach(([key, value]) => {
    if (value) headers.append(key, value.toString())
  })

  const session = await auth.api.getSession({ headers })

  if (!session) {
    return reply.status(403).send('Access Denied')
  }

  req.user = session.user as unknown as User
}

export const authorizationMiddleware = {
  check
}
