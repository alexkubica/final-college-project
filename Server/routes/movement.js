const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const movementRouter = express.Router();
const MOVEMENT_COLLECTION = 'movement';

movementRouter.get('/', getMethod);
movementRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received movement get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(MOVEMENT_COLLECTION).find({}).toArray(function (err, movementData) {
        if (err) throw err;
        res.json(movementData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch movement data" })
  }
}

function postMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received movement post request! " + currTime);
  console.dir(req.body);

  try {
    var rowToSave = req.body
    rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(MOVEMENT_COLLECTION).insertOne(rowToSave, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save movement data" })
  }
}

module.exports = movementRouter;