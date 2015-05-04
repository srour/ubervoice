//Global modules
var express = require('express');
var http = require('http');
var path = require('path');
var colors = require('colors');
var logger = require('express-logger');
var config = require('./config');
var bodyParser = require('body-parser')

var app = express();

app.listen(config.port,function(){
  console.log("ubervoice starting up".yellow);

  console.log("Hostname: ".bold+config.hostname+ " port: "+config.port);  
  console.log("Public directory: ".bold+config.public);
  console.log('Logfile: '.bold+config.logging.file);


  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');

  app.use(express.static(path.join(__dirname, config.public)));
  app.use(logger({path: config.logging.file}));

  //Configure routes
  require('./routes')(app);

  console.log("ubervoice: ready to accept requests".green);

});
