const express = require('express')
const middlewares = require('./middlewares')

const app = express()
app.use(middlewares)

module.exports = app
