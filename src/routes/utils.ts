import { FastifyInstance } from 'fastify'

export async function utilsRoutes(app: FastifyInstance) {
  app.get('/ping', () => {
    return 'pong'
  })
}
