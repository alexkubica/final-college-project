const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const howyoudoinRouter = express.Router();
const HOW_YOU_DOIN_COLLECTION = 'howyoudoin';


howyoudoinRouter.get('/howYouDoin', getMethod);
howyoudoinRouter.post('/howYouDoin', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
  console.log("Received How You Doin get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(HOW_YOU_DOIN_COLLECTION).find({}).toArray(function (err, howyoudoinData) {
        if (err) throw err;
        res.json(howyoudoinData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.status(500).send("failed to fetch how you doin data")
  }
}

function postMethod(req, res) {
    let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
    console.log("Received How You Doin post request! " + currTime);
    console.dir(req.body);
  
    try {
        var rowToSave = req.body
        rowToSave.dateReceived = currTime;
    
        mongoDB((db, close) => {
          db.collection(HOW_YOU_DOIN_COLLECTION).insertOne(rowToSave, (err) => {
            if (err) throw err;
            res.sendStatus(200);
            close();
          });
        });
      }
      catch (e) {
        console.error(e);
        res.status(500).send("failed to save how you doin data")
      }
  }

module.exports = howyoudoinRouter;