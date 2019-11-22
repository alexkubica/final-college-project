const { mongoDB } = require('../DB/mongo');
const BOTTLE_COLLECTION = 'bottle';

async function LastTimeDrank(){
    var prom = new Promise((resolve,reject) => {
        try {
            mongoDB((db, close) => {
                db.collection(BOTTLE_COLLECTION).find({}).sort({dateReceived:1}).limit(1).toArray(function (err, data) {
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
    const Http = new XMLHttpRequest();
    const url='~GetArduinoIPFromIDO~/NeedToDrink';
    Http.open("POST", url);
    Http.send();
}

module.exports = 
{
    SendArduinoNEEDTODRINK,
    LastTimeDrank
}