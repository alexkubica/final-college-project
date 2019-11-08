const { mongoDB } = require('./DB/mongo');

function start()
{
    let lockObj = false;
    
    setInterval(() => {
        // if - skip 
        // while - wait
        if(!lockObj)
        {
            lockObj = true;

            // TODO: check in db when was the last bottle data recieved
            //       if x minutes passed, send a message to the arduin

            lockObj = false;
        }
        
    }, 1000);
}

module.exports = 
{ 
    start
}