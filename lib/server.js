/*global process */
var https = require('https');
var express = require('express');
var jsforceAjaxProxy = require('./proxy');
var fs = require('fs');

var app = express();

var https_options = {
  key: fs.readFileSync("/opt/ssl/toonboom.com.key"),
  cert: fs.readFileSync("/opt/ssl/toonboom.com.crt"),
  ca: [
         // fs.readFileSync('path/to/CA_root.crt'),
          fs.readFileSync('/opt/ssl/gd_bundle.crt')
       ]
};

app.all('/proxy/?*', jsforceAjaxProxy({ enableCORS: true }));

app.get('/', function(req, res) {
  res.send('JSforce AJAX Proxy');
});

https.createServer(https_options, app).listen(443);