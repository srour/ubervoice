//Nodetime performance analysis
if(process.env.NODETIME_ACCOUNT_KEY) {
  require('nodetime').profile({
    accountKey: process.env.NODETIME_ACCOUNT_KEY,
    appName: 'Favens web' // optional
  });
}

//Global modules
var express = require('express');
var http = require('http');
var path = require('path');
var colors = require('colors');
var logger = require('express-logger');
var config = require('./config');


var app = express();

app.configure(function(){
  console.log("ubervoice starting up".yellow);

  console.log("Hostname: ".bold+config.hostname+ " port: "+config.port);  
  console.log("Public directory: ".bold+config.public);
  console.log('Logfile: '.bold+config.logging.file);


  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('port', config.port);

  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.static(path.join(__dirname, config.public)));
  app.use(logger({path: config.logging.file}));
  app.use(express.errorHandler());

  app.use(app.router);

});

//Configure routes
require('./routes')(app);

//******************Server startup*******************************************
//Start the server up
http.createServer(app).listen(app.get('port'), function(){
  console.log("ubervoice: ready to accept requests".green);
});