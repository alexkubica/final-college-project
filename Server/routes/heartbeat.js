const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const heartbeatRouter = express.Router();
const HEARTBEAT_COLLECTION = 'heartbeat';

heartbeatRouter.get('/', getMethod);
heartbeatRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
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
  console.dir(req.body);
  var rowToSave = req.body
  SaveHeartBeat(rowToSave,res)
}

const SaveHeartBeat = (p_rowToSave,p_res) =>
{
  try {
   let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
   p_rowToSave.dateReceived = currTime;
   console.log(p_rowToSave)

    mongoDB((db, close) => {
      db.collection(HEARTBEAT_COLLECTION).insertOne(p_rowToSave, (err) => {
        if (err) throw err;
        
        if(p_res != undefined)
           p_res.sendStatus(200);

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