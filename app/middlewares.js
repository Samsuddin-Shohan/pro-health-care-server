const cors = require('cors');
const mongodb = require('mongodb');
const morgan = require('morgan');
const express = require('express');

const middlewares =[cors(),morgan('dev'),express.json(),express.urlencoded({extended:true})];
module.exports = middlewares;