// Requires
require('dotenv').config()
let bodyParser = require('body-parser')
const express = require('express')
var cors = require('cors');
let uv = require('./routes/uv');
let posture = require('./routes/posture');
let weather = require('./routes/weather');
let movement = require('./routes/movement');
let heartbeat = require('./routes/heartbeat');
let bottle = require('./routes/bottle');
let howYouDoin = require('./routes/howYouDoin');
let jarvisBrain = require('./routes/jarvisBrain');
let logic = require('./Logic')

// Config
const PORT = Number(process.env.PORT || 8080);

// Express listener
const app = express();

// Express config
app.use(cors());
app.use(bodyParser.json());

// Epxress route config
app.use("/uv", uv.SaveUv);
app.use("/posture", posture);
app.use("/weather", weather.weatherRouter);
app.use("/movement", movement);
app.use("/heartbeat", heartbeat.heartbeatRouter);
app.use("/bottle", bottle);
app.use("/jarvisBrain", jarvisBrain);
app.use("/HowYouDoin",howYouDoin)

// Start listening
app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server started on port: ${PORT}`)
});

// If want some other logics
logic.start();