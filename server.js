// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// enable Body-Parser for URL decoding
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/views'));

// For testing purposes
app.use(function(req, res) {
  var method = req.method;
  var route = req.path;
  var ip = req.ip;
  console.log(`${method} ${route} - ${ip}`);
});

app.get('/json', function(req, res) {
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({message: response.toUpperCase()});
  } else {
    res.json({message: "Hello json"});
  }
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile('/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Timestamp GET response
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
