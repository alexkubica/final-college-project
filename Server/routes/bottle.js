const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const bottleRouter = express.Router();
const BOTTLE_COLLECTION = 'bottle';

bottleRouter.get('/', getMethod);
bottleRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received bottle get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(BOTTLE_COLLECTION).find({}).toArray(function (err, bottleData) {
        if (err) throw err;
        res.json({ data: bottleData })
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch bottle data" })
  }
}

function postMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received bottle post request! " + currTime);
  console.dir(req.body);

  try {
    var rowToSave = req.body
    rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(BOTTLE_COLLECTION).insertOne(rowToSave, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save bottle data" })
  }
}

module.exports = bottleRouter;