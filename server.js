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
server.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`);
})

