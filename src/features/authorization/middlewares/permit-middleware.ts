import { authorizationService } from '../services/authorization-service'
import { FastifyReply, FastifyRequest } from 'fastify'

function check(resourceKey: string, actionName: string, context: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const isAllowed = await authorizationService.check({
      userKey: req.user.email,
      resourceKey,
      action: actionName,
      context
    })

    if (!isAllowed) {
      return reply.status(403).send('Access Denied')
    }

    reply.send()
  }
}

export const authorizationMiddleware = {
  check
}
