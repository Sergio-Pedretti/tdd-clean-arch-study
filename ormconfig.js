module.exports = {
  type: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  entities: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/postgres/entities/index.{js,ts}`]
}
