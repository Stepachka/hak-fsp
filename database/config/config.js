const { resolve } = require('path')
const node_env = process.env.NODE_ENV || 'development'

require('dotenv').config({
  path: resolve(__dirname, '../../', `.${node_env}.env`)
})

const genericConfig = {
  dialect: 'postgres',
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST
}

module.exports = {
  development: { ...genericConfig },
  test: { ...genericConfig },
  production: { ...genericConfig }
}
