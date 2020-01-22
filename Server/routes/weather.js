const moment = require('moment');
const express = require('express');
const { mongoDB } = require('../DB/mongo');

const weatherRouter = express.Router();
const WEATHER_COLLECTION = 'weather';

weatherRouter.get('/', getMethod);
weatherRouter.post('/', postMethod);

function getMethod(req, res) {
  let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
  console.log("Received weather get request! " + currTime);

  try {
    mongoDB((db, close) => {
      db.collection(WEATHER_COLLECTION).find({}).toArray(function (err, weatherData) {
        if (err) throw err;
        res.json(weatherData);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to fetch weather data" })
  }
}

function postMethod(req, res) {
  console.dir(req.body);
  let rowToSave = req.body
  SaveWeather(rowToSave);  
}

const SaveWeather = (p_rowToSave) =>
{
  try {
    let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
    p_rowToSave.dateReceived = currTime;
    console.log(p_rowToSave)

    mongoDB((db, close) => {
      db.collection(WEATHER_COLLECTION).insertOne(p_rowToSave, (err) => {
        if (err) throw err;
        //res.sendStatus(200);
        close();
      });
    });
  }
  catch (e) {
    console.error(e);
    res.sendStatus(500).json({ error: "failed to save weather data" })
  }
}

module.exports = {
  weatherRouter,
  SaveWeather
};