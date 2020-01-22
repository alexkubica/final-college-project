const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const uvRouter = express.Router();
const UV_COLLECTION = 'uv';

uvRouter.get('/', getMethod);
uvRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
  console.log("Received uv get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(UV_COLLECTION).find({}).toArray(function (err, uvData) {
        if (err) throw err;
        res.json(uvData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch uv data" })
  }
}

function postMethod(req, res) {    
  console.dir(req.body);
  var rowToSave = req.body
  SaveUv(rowToSave,res);
}

const SaveUv = (p_rowToSave,p_res = undefined) =>
{
  try {
    let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
    p_rowToSave.dateReceived = currTime;

    mongoDB((db, close) => {
      db.collection(UV_COLLECTION).insertOne(p_rowToSave, (err) => {
        if (err) throw err;

        if(p_res != undefined)
           p_res.sendStatus(200);

        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save uv data" })
  }
}

module.exports = 
{
  uvRouter,
  SaveUv
};