const MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://jarvis-user:Aa123456@ds235181.mlab.com:35181/jarvis-db"
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "jarvis-db";
const MongoClient = require('mongodb').MongoClient;

const Client = new MongoClient(
  MONGO_DB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);


module.exports = 
{
    Client,
    MONGO_DB_NAME
}