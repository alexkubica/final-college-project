const { mongoDB } = require('../DB/mongo');
const BOTTLE_COLLECTION = 'bottle';
const http = require('http')
const { IP,PORT, NEED_TO_DRINK_ROUTE} = require('./ArduinoPaths')

const TIME_DIDNT_DRINK_IN_MINUTES_TO_ALERT = 60

async function BottleLogic(){
    let lastTime = await LastTimeDrank()
    lastTime = lastTime.substring(3,5) + "/" + lastTime.substring(0,2) + "/"+ lastTime.substring(6)
    lastTime = new Date(lastTime)
    let currTime = Date.now()
    let timeDidntDrinkInMinutes = Math.floor(((currTime - lastTime)/1000)/60)
    console.log("didnt drink for " + timeDidntDrinkInMinutes + " minutes")
    if( timeDidntDrinkInMinutes > TIME_DIDNT_DRINK_IN_MINUTES_TO_ALERT)
        SendArduinoNEEDTODRINK();
}

async function LastTimeDrank(){
    var prom = new Promise((resolve,reject) => {
        try {
            mongoDB((db, close) => {
                db.collection(BOTTLE_COLLECTION).find({}).sort({dateReceived:-1}).limit(1).toArray(function (err, data) {
                    err 
                        ? reject(err)
                        : resolve(data[0].dateReceived)
                    close()
                });
            });
        }
        catch (e) {
            console.error(e);
        }
    })

    return await prom
}

function SendArduinoNEEDTODRINK(){
    http.request({
        hostname: IP,
        port: PORT,
        path: '/' + NEED_TO_DRINK_ROUTE,
        method: 'POST'
    }, (res) => {
        console.log(`STATUS: ${res.statusCode}`);
    })
}

module.exports = 
{
    BottleLogic
}