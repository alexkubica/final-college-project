// Requires
require('dotenv').config()
let bodyParser = require('body-parser')
const express = require('express')
let tilt = require('./routes/tilt');
let distance = require('./routes/distance');

// Config
const PORT = Number(process.env.PORT || 8080);

// Express listener
const app = express();
app.use(bodyParser.json());
app.use("/tilt",tilt);
app.use("/distance",distance);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HTTP server started on port: ${PORT}`)
});
