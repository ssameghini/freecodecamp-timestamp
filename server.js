// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Require and enable Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// http://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname + '/views'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile('/views/index.html');
});

// Timestamp GET response
app.get("/api/timestamp/", (req, res) => {
  res.json({ unix: Date.now(), utc: Date() });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;

  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

app.post('/api/timestamp',function(req, res) {
  console.log(req.body.date);
  var inputArray = req.body.date;
  var dateString = inputArray.filter(input => input ? true : false);

  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({ unix: dateInt, utc: new Date(dateInt).toUTCString() });
  } else {
    let dateObject = new Date(dateString);
    if (dateObject.toString() === "Invalid Date") {
      res.json({ error: "Invalid Date" });
    } else {
      res.json({ unix: dateObject.valueOf(), utc: dateObject.toUTCString() });
    }
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// For testing purposes
app.use(function(req, res, next) {
  var method = req.method;
  var route = req.path;
  var ip = req.ip;
  console.log(`${method} ${route} - ${ip}`);
  next();
});

// your first API endpoints... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/json', function(req, res) {
  var response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    res.json({message: response.toUpperCase()});
  } else {
    res.json({message: "Hello json"});
  }
});
