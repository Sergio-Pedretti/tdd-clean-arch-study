import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: 'babar.db.elephantsql.com',
  port: 5432,
  username: 'lwhslbnp',
  password: 'kiM3ETO1hhDG-D6W5yxP_a7OkEtSFMng',
  database: 'lwhslbnp',
  entities: ['dist/infra/postgres/entities/index.js']
}