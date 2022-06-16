require('dotenv').config()
const http = require('http')
const { ObjectId } = require('mongodb')
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
    const userCollections = database.collection('users')
    const doctorCollection = database.collection('doctors')
    app.get('/', (req, res) => {
      res.send('hello,application is running')
    })
    app.get('/hello', (req, res) => {
      res.send('hello,application is running')
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
    app.get('/appointments/:username', async (req, res) => {
      const username = req.params.username
      const qurey = {
        name: username,
      }
      const cursors = await appointmentsCollection.find(qurey)
      const appoinments = await cursors.toArray()
      res.json(appoinments)
    })
    app.post('/appointments', async (req, res) => {
      const { name, email, cell, problem } = req.body
      const status = 'pending'
      const result = await appointmentsCollection.insertOne({
        name,
        email,
        cell,
        problem,
        status,
      })
      res.send(result)
    })
    app.put('/status', async (req, res) => {
      const id = req.query.id
      const status = req.query.status
      const _id = ObjectId(id)
      const filter = { _id: _id }

      // this option instructs the method to create a document if no documents match the filter
      const options = { upsert: true }
      // create a document that sets the plot of the movie
      const updateDoc = {
        $set: {
          status: status,
        },
      }
      const result = await appointmentsCollection.updateOne(
        filter,
        updateDoc,
        options
      )
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
