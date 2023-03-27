module.exports = {
  type: process.env.DB_NAME,
  url: process.env.DB_URL,
  synchronize: true,
  logging: true,
  entities: [`${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/postgres/entities/index.{js,ts}`]
}
