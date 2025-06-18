import 'dotenv/config'
import fastify from 'fastify'
import generalConfig from './config/general'
import { knex } from './infra/database'

const app = fastify()

app.get('/ping', () => {
  return 'pong'
})

app.get('/db', async () => {
  const tables = await knex('sqlite_schema').select('*')

  return tables
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
