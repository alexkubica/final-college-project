const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const distanceRouter = express.Router();
const DISTANCE_COLLECTION = 'distance';

distanceRouter.get('/', getMethod);
distanceRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received distance get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(DISTANCE_COLLECTION).find({}).toArray(function (err, distanceData) {
        if (err) throw err;
        res.json({ data: distanceData })
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch distance data" })
  }
}

function postMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received distance post request! " + currTime);
  console.dir(req.body);

  try {
    var rowToSave = req.body
    rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(DISTANCE_COLLECTION).insertOne(rowToSave, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save distance data" })
  }
}

module.exports = distanceRouter;