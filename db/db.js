const MongoClient = require('mongodb').MongoClient

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.clkdx.mongodb.net/?retryWrites=true&w=majority
`
const client = new MongoClient(uri)

module.exports = client
