require('dotenv').config()
const http = require('http')
const app = require('./app/app')
const PORT = process.env.PORT || 7000
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
    const userCollections = database.collection('users')
    const doctorCollection = database.collection('doctors')
    app.get('/', (req, res) => {
      console.log('application is running')
    })
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email
      console.log(email)
      const user = await userCollections.findOne({ email: email })
      console.log(user)
      res.json(user)
    })
    app.post('/users', async (req, res) => {
      const { name, email, password } = req.body
      const result = await userCollections.insertOne({
        name,
        email,
        password,
      })
      res.send(result)
    })
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
    app.get('/doctors', async (req, res) => {
      const cursors = await doctorCollection.find({})
      const doctors = await cursors.toArray()
      res.send(doctors)
    })
    app.post('/doctors', async (req, res) => {
      const { name, title, description, image } = req.body
      const result = await doctorCollection.insertOne({
        title,
        description,
        image,
        name,
      })
      res.send(result)
    })
    app.get('/appointments', async (req, res) => {
      const cursors = await appointmentsCollection.find({})
      const appoinments = await cursors.toArray()
      res.json(appoinments)
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
