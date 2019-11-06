const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const tiltRouter = express.Router();
const TILT_COLLECTION = 'tilt';

tiltRouter.get('/', getMethod);
tiltRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received tilt get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(TILT_COLLECTION).find({}).toArray(function (err, tiltData) {
        if (err) throw err;
        res.json({ data: tiltData })
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch tilt data" })
  }
}

function postMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received tilt post request! " + currTime);
  console.dir(req.body);

  try {
    var rowToSave = req.body
    rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(TILT_COLLECTION).insertOne(rowToSave, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save tilt data" })
  }
}

module.exports = tiltRouter;