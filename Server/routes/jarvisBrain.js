const moment = require('moment');
const express = require('express');

const Router = express.Router();

Router.post('/isOnline', postMethod_IsOnline);

function postMethod_IsOnline(req, res) {
    var arduinoName = req.body.name;
    if(arduinoName == undefined)
    {
        let txt = "No arduino name in the body. should be {'name':'lala'}";
        console.log(txt);
        res.status(500).send(txt);
        return;
    }

    let currTime = moment().format('DD/MM/YYYY HH:mm:ss');
    console.log("Server is online for " + arduinoName + "! time: " + currTime);
    res.json({"jarvis mate":arduinoName,"time":currTime});
}

module.exports = Router;