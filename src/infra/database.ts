import { knex as setupKnex, Knex } from 'knex'
import 'dotenv/config'

export const config: Knex.Config = {
  client: process.env.DATABASE_CLIENT || 'sqlite3',
  connection: {
    filename: process.env.DATABASE_FILE_NAME || '',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/infra/migrations',
  },
}

export const knex = setupKnex(config)
