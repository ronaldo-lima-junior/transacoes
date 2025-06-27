import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../infra/database'
import { randomUUID } from 'node:crypto'
import { Knex } from 'knex'
import { checkSessionIdExists } from '../middleware/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request, response) => {
    checkSessionIdExists(request, response)
  })

  app.get('/', async (request) => {
    const { sessionId } = request.cookies
    const transactions = await knex('transactions')
      .select()
      .where('session_id', sessionId)

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = getTransactionParamSchema.parse(request.params)
    const { sessionId } = request.cookies

    const transaction = await knex('transactions')
      .where('id', id)
      .where('session_id', sessionId)
      .first()

    return transaction
  })

  app.get('/summary', async (request) => {
    const { sessionId } = request.cookies
    const summary = await knex('transactions')
      .sum('amount', { as: 'amount' })
      .where('session_id', sessionId)
      .first()

    const amount = summary?.amount
    return { amount }
  })

  app.post('/', async (request, response) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    )

    let sessionId = request.cookies.sessionId
    if (!sessionId) {
      sessionId = randomUUID()

      response.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return response.status(201).send()
  })
}
