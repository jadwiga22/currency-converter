var http = require('http');
var express = require('express');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));


http.createServer(app).listen(3000);
console.log('started');

