import fastify from 'fastify'
import generalConfig from './config/general'
import { transactionsRoutes } from './routes/transactions'
import { utilsRoutes } from './routes/utils'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)
app.register(utilsRoutes)
app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app
  .listen({
    port: generalConfig.port,
  })
  .then(() => {
    console.log(
      `\n💻 ${generalConfig.name} iniciado na porta ${generalConfig.port}`,
    )
  })
