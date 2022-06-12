require('dotenv').config()
const http = require('http')
const app = require('./app/app')
const PORT = process.env.PORT || 8000
const {
  getServices,
  getAppontments,
  postAppointments,
  postServices,
} = require('./controller/mainController')
const client = require('./db/db')
const server = http.createServer(app)

async function run() {
  try {
    await client.connect()
    console.log('database connected')
    const database = client.db('proHealthCare')
    const servicesCollection = database.collection('services')
    const appointmentsCollection = database.collection('appoinments')
    app.get('/services', async (req, res) => {
      const cursors = await servicesCollection.find({})
      const services = await cursors.toArray()
      res.send(services)
    })
    app.post('/services', async (req, res) => {
      const { title, description, image } = req.body
      const result = await servicesCollection.insertOne({
        title,
        description,
        image,
      })
      res.send(result)
    })
    app.get('/appointments', async (req, res) => {
      const appoinments = await appointmentsCollection.find({})
    })
    app.post('/appointments', async (req, res) => {
      const { name, email, cell, problem } = req.body
      const result = await appointmentsCollection.insertOne({
        name,
        email,
        cell,
        problem,
      })
      res.send(result)
    })
  } finally {
    // await client.close();
  }
}
run().catch(console.dir)

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
