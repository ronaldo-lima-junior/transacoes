import fastify from 'fastify'
import generalConfig from './config/general'
import { knex } from './infra/database'
import { transactionsRoutes } from './routes/transactions'

const app = fastify()

app.register(transactionsRoutes)
app
  .listen({
    port: generalConfig.port,
  })
  .then(() => {
    console.log(
      `\n💻 ${generalConfig.name} iniciado na porta ${generalConfig.port}`,
    )
  })
