const { BottleLogic } = require('./BL/bottle');
let heartbeat = require('./routes/heartbeat');
let weather = require('./routes/weather');
const intervalTimeInSeconds = 1;

function start()
{
    let lockObj = false;
    
    let runs = 200;
    let number = 70 + Math.floor(Math.random() * Math.floor(10));

    setInterval(async () => {
        // if - skip 
        // while - wait
        if(!lockObj)
        {
            lockObj = true;

            if(runs-- == 0) {
                runs = 200
                number = 80 + Math.floor(Math.random() * Math.floor(10));
            }

            let number1 = number + Math.floor(Math.random() * Math.floor(3));           

            //await BottleLogic();
            //heartbeat.SaveHeartBeat({'BPM': number1})
            weather.SaveWeather({"Temprature":"14°C", "Humidity":"33%"})

            lockObj = false;
        }
        
    }, 1000 * intervalTimeInSeconds);
}

module.exports = 
{ 
    start
}