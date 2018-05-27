var express = require('express')
var app = express()

var getcookies = require('..');

app.use(getcookies);
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
