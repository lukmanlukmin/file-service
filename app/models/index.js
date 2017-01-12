'use strict'

const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const sequelize = new Sequelize(
  process.env.DB_MYSQL_DATABASE,
  process.env.DB_MYSQL_USERNAME,
  process.env.DB_MYSQL_PASSWORD, {
    dialect: 'mysql',
    protocol: 'mysql',
    host: process.env.DB_MYSQL_HOST,
    port: process.env.DB_MYSQL_PORT,
    logging: process.env.APP_ENV === 'development' ? console.log : false,
    define: {
      timestamps: false
    },
    timezone: '+07:00'
  }
)

const db = {}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
