const { BottleLogic } = require('./BL/bottle');
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

module.exports = 
{ 
    start
}