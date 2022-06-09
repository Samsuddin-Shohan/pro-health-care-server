const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const http = require('http')
const express = require('express');
const cors = require('cors');
const mongodb = require('mongodb');
const morgan = require('morgan');
const PORT = process.env.PORT || 8000;

const app = express();
app.use([cors(),morgan('dev'),express.json(),express.urlencoded({extended:true})]);
const server = http.createServer(app);

const uri = `mongodb://localhost:27017/`;
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('database connected');
    const database = client.db("online-store");
    const productsCollection = database.collection("products");
    
   
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

