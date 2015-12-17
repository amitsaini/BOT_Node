//var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var xml2js = require('xml2js');

var selectedObjects;
var port = process.env.port || 1337;
var app = express();

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://amit-pc:8000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');    
    next();
}

app.use(bodyParser());
app.use(allowCrossDomain);

/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
  bodyParser();
});*/


app.listen(port);
app.use(express.static('public'));
var metadataResponse;

var userName = "Administrator";
var password = "Manager123";
var serverIP = "192.168.223.117";
var cmsName = "WIN-BO41";
var universeName = "EFASHION2";
var universeId = "700067";

app.get('/', function (request, response) {
    response.sendfile("BOT.html");
});


var bo = require('./model/bo.js');

app.post('/api/setCMS', function (request, response) {
    var data = JSON.parse(request.body.data);
     userName = data["UserName"];
     password = data["Password"];;
     serverIP = data["Server"];;
     cmsName = data["CMS"];;
     universeName = data["UnxName"];;
    universeId = data["UnxId"];
    response.send(true);
});

app.post('/api/getMD', function (request, response) {
   
    
    var jsonString = fs.readFileSync("./UniverseMetdata/"+ universeName+".json").toString();
    var jsObject = JSON.parse(jsonString);
    var boHandler = new bo(jsObject);
    var metadataResponse = boHandler.getBOData();
    response.send(metadataResponse);
});

app.get('/api/getMD2', function (request, response) {
    var boHandler = new bo(parser);
    metadataResponse = boHandler.getBOData();
    response.send(metadataResponse);
});

app.post('/api/submitBoIds', function (request, response) {
    selectedObjects = JSON.parse(request.body.data);
    response.send(true);
});

var bot = require('./model/bot.js');
app.get('/api/GetBOBJData', function (request, response) {    
    //var userName = "Administrator";
    //var password = "Rolta1234";
    //var serverIP = "172.16.93.65";
    //var cmsName = "SmartmigrateMM";
    //var universeId = "139481";
    var botHandler = new bot(userName, password, serverIP, cmsName, universeId, selectedObjects);
    var res = botHandler.GetBOBJData(response);
    //var _logoff = botHandler.SAPLogoff();
});


