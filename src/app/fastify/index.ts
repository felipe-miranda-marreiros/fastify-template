import Fastify from 'fastify'
import { protectedRoutes } from './protected-routes'
import { publicRoutes } from './public-routes'
import { log } from '@/infrastructure/logger'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider
} from 'fastify-type-provider-zod'

export const fastify = Fastify({
  loggerInstance: log
}).withTypeProvider<ZodTypeProvider>()

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
})

fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)

fastify.register(fastifySwagger, {
  exposeHeadRoutes: true,
  openapi: {
    openapi: '3.1.0',
    info: {
      title: 'Greeting API',
      description:
        'This API allows you to greet users by their name, providing personalized greeting messages.',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development environment for local testing'
      }
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
          description:
            'API key used for authentication, required in the header of requests.'
        }
      }
    },
    tags: [
      { name: 'Greeting', description: 'Endpoints related to user greetings.' }
    ]
  },
  transform: jsonSchemaTransform
})

fastify.register(fastifySwaggerUi, {
  routePrefix: '/docs'
})

// Rotas públicas
fastify.register(publicRoutes)

// Rotas protegidas
fastify.register(protectedRoutes)

// 404
fastify.setNotFoundHandler((_, reply) => {
  reply.status(404).send({ error: 'Rota não encontrada' })
})
