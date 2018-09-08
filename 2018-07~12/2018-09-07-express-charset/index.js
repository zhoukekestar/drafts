var express = require('express')
var app = express()
var path = require('path');

app.get('/', (req, res) => {
  console.log(req.query.p);
  res.send('hello world');
});

app.get('/utf-1', (req, res) => {
  res.set('Content-Type', 'text/html;charset=utf-8');
  res.sendFile(path.join(__dirname, './utf-1.html'));
})

app.get('/utf-2', (req, res) => {
  res.set('Content-Type', 'text/html;charset=gbk');
  res.sendFile(path.join(__dirname, './utf-2.html'));
})

app.get('/gbk-1', function (req, res) {
  res.set('Content-Type', null);
  res.sendFile(path.join(__dirname, './gbk-1.html'));
})

app.get('/gbk-2', function (req, res) {
  res.set('Content-Type', null);
  res.sendFile(path.join(__dirname, './gbk-2.html'));
})

app.listen(3000)
