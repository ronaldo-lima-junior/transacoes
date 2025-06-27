import fastify from 'fastify'
import { transactionsRoutes } from './routes/transactions'
import { utilsRoutes } from './routes/utils'
import cookie from '@fastify/cookie'

export const app = fastify()

app.register(cookie)
app.register(utilsRoutes)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})
