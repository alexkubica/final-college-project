const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const heartbeatRouter = express.Router();
const HEARTBEAT_COLLECTION = 'heartbeat';

heartbeatRouter.get('/', getMethod);
heartbeatRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received heartbeat get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(HEARTBEAT_COLLECTION).find({}).toArray(function (err, heartbeatData) {
        if (err) throw err;
        res.json(heartbeatData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch heartbeat data" })
  }
}

function postMethod(req, res) {
  //console.log("Received heartbeat post request! " + currTime);
  console.dir(req.body);
  var rowToSave = req.body
  SaveHeartBeat(rowToSave)
}

const SaveHeartBeat = (p_rowToSave) =>
{
  try {
   let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
   p_rowToSave.dateReceived = currTime;
   console.log(p_rowToSave)

    mongoDB((db, close) => {
      db.collection(HEARTBEAT_COLLECTION).insertOne(p_rowToSave, (err) => {
        if (err) throw err;
        //res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save heartbeat data" })
  }
}

module.exports = {
  heartbeatRouter,
  SaveHeartBeat
};