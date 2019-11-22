const { LastTimeDrank,SendArduinoNEEDTODRINK } = require('./BL/bottle');
const intervalTimeInSeconds = 10;

function start()
{
    let lockObj = false;
    
    setInterval(async () => {
        // if - skip 
        // while - wait
        if(!lockObj)
        {
            lockObj = true;

            await BottleLogic();

            lockObj = false;
        }
        
    }, 1000 * intervalTimeInSeconds);
}

async function BottleLogic(){
    let lastTime = await LastTimeDrank()
    lastTime = lastTime.substring(3,5) + "/" + lastTime.substring(0,2) + "/"+ lastTime.substring(6)
    lastTime = new Date(lastTime)
    let currTime = Date.now()
    if(((currTime - lastTime)/1000)/60/60 > 1)
        SendArduinoNEEDTODRINK();
}

module.exports = 
{ 
    start
}