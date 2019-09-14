require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient;

// Config
const PORT = Number(process.env.PORT || 8080);
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'jarvis-db';

const app = express()

// Use connect method to connect to the server
MongoClient.connect(MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err, client) {
    if (client) {
      console.log("Connected successfully to db");

      app.get('/', function (req, res) {
        res.send('Hello World')
      })
      app.get('/kaki', function (req, res) {
        res.send('Hello World');
        console.log("/kaki");
      })
      
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`HTTP server started on port: ${PORT}`)
      })

      // const db = client.db(MONGO_DB_NAME);

      // client.close();
    } else {
      console.log("Couldn't connect to db");
    }
  });