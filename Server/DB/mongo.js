const MONGO_DB_URL =
  process.env.MONGO_DB_URL || "mongodb://localhost:27017/jarvis-local";
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "jarvis-local";
const MongoClient = require("mongodb").MongoClient;

function mongoDB(callback) {
  const client = new MongoClient(MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  client.connect(function(err) {
    if (err) {
      client.close();
      throw err;
    }
    const db = client.db(MONGO_DB_NAME);
    callback(db, () => {
      client.close();
    });
  });
}

module.exports = {
  mongoDB
};
