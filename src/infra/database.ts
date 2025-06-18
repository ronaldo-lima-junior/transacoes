import { knex as setupeKnex, Knex } from 'knex'

export const config: Knex.Config = {
  client: process.env.DATABASE_CLIENT || 'sqlite',
  connection: {
    filename: process.env.DATABASE_FILE_NAME || '',
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './src/infra/migrations',
  },
}

export const knex = setupeKnex(config)
