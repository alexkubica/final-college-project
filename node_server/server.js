// Requires
require('dotenv').config()
var bodyParser = require('body-parser')
const express = require('express')
var moment = require('moment');
const MongoClient = require('mongodb').MongoClient;

// Config
const PORT = Number(process.env.PORT || 8080);
const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://jarvis-user:Aa123456@ds235181.mlab.com:35181/jarvis-db"
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "jarvis-db";

// Mongo collections
const DISTANCES_COLLECTION = 'distances';
const UVS_COLLECTION = 'uvs';
const HEARTS_COLLECTION = 'hearts';
const TILTS_COLLECTION = 'tilts';
const BOTTLES_COLLECTION = 'bottles';

// Express listener
const app = express();
app.use(bodyParser.json());

// TODO use async/await api
const mongoClient = new MongoClient(
  MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.get('/', (req, res) => {
  res.send(`Welcome to jarvis' node server!`)
});

app.get('/distance', (req, res) => {
  mongoClient.connect(err => {
    if (err) {
      console.error(err);
      return res(err);
    } else {
      mongoClient.db(MONGO_DB_NAME).collection(DISTANCES_COLLECTION).find().toArray((err, result) => {
        if (err) {
          console.error(err);
          return res(err);
        } else {
          console.dir(result);
          return res.json(result);
        }
      });
      mongoClient.close();
    }
  });
});
app.post('/distance', (req, res) => {
  res.send('POST /distance');
});

app.get('/tilt', (req, res) => {
  try{
    mongoClient.connect(err => {
      if (err) {
        console.error(err);
        return res.send(500).json({error:"DB connection error"})
      } else {
        let allDataFromTiltTable;
        mongoClient.db(MONGO_DB_NAME).collection(TILTS_COLLECTION).find({}).toArray(function(err, result) {
          if (err) throw err;
          allDataFromTiltTable = result;
          mongoClient.close();
          res.json({data:allDataFromTiltTable})
        });
      }
    });
  }
  catch(e){
      res.send(500).json({error:"SOMTHING IS BAD"})
  }
});

app.post('/tilt', (req, res) => {
  try{
    var rowToSave = req.body   
    rowToSave.dateReceived = moment().format('DD/MM/YYYY hh:mm:ss');
    mongoClient.connect(err => {
      if (err) {
        console.error(err);
        return res.send(500).json({error:"DB connection error"})
      } else {
        mongoClient.db(MONGO_DB_NAME).collection(TILTS_COLLECTION).insertOne(rowToSave)
        mongoClient.close();
        res.send(200);
      }
    });
  }
  catch(e){
    return res.send(500).json({error:"somthing went wrong LOL"})
  }   
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server started on port: ${PORT}`)
});
