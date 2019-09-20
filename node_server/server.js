require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient;

// Config
const PORT = Number(process.env.PORT || 8080);
const MONGO_DB_URL = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || 'jarvis-db';

// Mongo collections
const DISTANCES_COLLECTION = 'distances';
const UVS_COLLECTION = 'uvs';
const HEARTS_COLLECTION = 'hearts';
const TILTS_COLLECTION = 'tilts';
const BOTTLES_COLLECTION = 'bottles';

const app = express();
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

app.get('/uv', (req, res) => {
  res.send('GET /uv');
});
app.post('/uv', (req, res) => {
  res.send('POST /uv');
});

app.get('/heart', (req, res) => {
  res.send('GET /heart');
});
app.post('/heart', (req, res) => {
  res.send('POST /heart');
});

app.get('/tilt', (req, res) => {
  res.send('GET /tilt');
});
app.post('/tilt', (req, res) => {
  res.send('POST /tilt');
});

app.get('/bottle', (req, res) => {
  res.send('GET /bottle');
});
app.post('/bottle', (req, res) => {
  res.send('POST /bottle');
});
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server started on port: ${PORT}`)
});