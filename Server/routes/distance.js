let moment = require('moment');
let express = require('express');
let mongo = require('../DB/mongo')
let distanceRouter = express.Router();
const DISTANCE_COLLECTION = 'distance';

distanceRouter.get('/',getMethod);
distanceRouter.post('/',postMethod);

function getMethod(req,res){
    let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
    console.log("Received disntace get request! " + currTime)
    try{
      mongo.Client.connect(err => {
          if (err) {
            console.error(err);
            return res.send(500).json({error:"DB connection error"})
          } else {
            let allDataFromTiltTable;
            mongo.Client.db(mongo.MONGO_DB_NAME).collection(DISTANCE_COLLECTION).find({}).toArray(function(err, result) {
              if (err) throw err;
              allDataFromTiltTable = result;
              mongo.Client.close();
              res.json({data:allDataFromTiltTable})
            });
          }
        });
    }
    catch(e){
        res.send(500).json({error:"SOMTHING IS BAD"})
    }
}

function postMethod(req,res){
    let currTime = moment().format('DD/MM/YYYY hh:mm:ss');
    console.log("Received disntace post request! " + currTime)
    try{
        var rowToSave = req.body   
        rowToSave.dateReceived = currTime;
        mongo.Client.connect(err => {
        if (err) {
            console.error(err);
            return res.send(500).json({error:"DB connection error"})
        } else {
            mongo.Client.db(mongo.MONGO_DB_NAME).collection(DISTANCE_COLLECTION).insertOne(rowToSave)
            mongo.Client.close();
            res.send(200);
        }
        });
    }
    catch(e){
        return res.send(500).json({error:"somthing went wrong LOL"})
    }   
}

module.exports = distanceRouter;