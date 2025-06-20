import { FastifyInstance } from 'fastify'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/ping', () => {
    return 'pong'
  })
}
