
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var mesroutes = require('./routes/routes')

app.use(express.static(__dirname + '/views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', mesroutes)

var port = "8000";
app.set('port', port);
server.listen(port);
console.log("Server launched on port " + port);