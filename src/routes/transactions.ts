import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../infra/database'
import { randomUUID } from 'node:crypto'
import { Knex } from 'knex'

export async function transactionsRoutes(app: FastifyInstance) {
  app.get('/', async () => {
    const transactions = await knex('transactions').select()

    return { transactions }
  })

  app.get('/:id', async (request) => {
    const getTransactionParamSchema = z.object({
      id: z.string().uuid(),
    })
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

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
    })

    return response.status(201).send()
  })
}
