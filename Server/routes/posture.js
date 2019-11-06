const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const postureRouter = express.Router();
const POSTURE_COLLECTION = 'posture';

postureRouter.get('/', getMethod);
postureRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received posture get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(POSTURE_COLLECTION).find({}).toArray(function (err, postureData) {
        if (err) throw err;
        res.json(postureData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch posture data" })
  }
}

function postMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received posture post request! " + currTime);
  console.dir(req.body);

  try {
    var rowToSave = req.body
    rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(POSTURE_COLLECTION).insertOne(rowToSave, (err) => {
        if (err) throw err;
        res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save posture data" })
  }
}

module.exports = postureRouter;