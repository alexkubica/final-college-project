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

// Config
const PORT = Number(process.env.PORT || 8080);

// Express listener
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/uv", uv);
app.use("/posture", posture);
app.use("/weather", weather);
app.use("/movement", movement);
app.use("/heartbeat", heartbeat);
app.use("/bottle", bottle);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server started on port: ${PORT}`)
});
