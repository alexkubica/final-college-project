const express = require('express')
const app = express()
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/kaki', function (req, res) {
  res.send('Hello World');
  console.log("/kaki");
})
 
app.listen(25565,'0.0.0.0')