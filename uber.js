//Global modules
var express = require('express');
var http = require('http');
var path = require('path');
var colors = require('colors');
var logger = require('express-logger');
var config = require('./config');
var bodyParser = require('body-parser')
var passport = require('passport');
var uberStrategy = require('passport-uber');
var util = require('util');
var session = require('express-session');
var User = require('./models').User;

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
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));

  // parse application/json
  app.use(bodyParser.json());

  app.use(session({ secret: 'anything' }));

  //Configure passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(id, done) {

    console.log("Getting user: "+id+" from DB for session");
    User.findById(id, function(err, user) {
      if(err) console.log("Could not find user with id: "+id);
      done(err, user);
    });

  });

  passport.use(new uberStrategy({
    clientID: "tzuBSK917EYVpOWD9dQhhiA1Qr18Peh6",
    clientSecret: "GFbj58hxhLGY7Esuvn2kKkYyVV2a1iAg4VACl5d-",
    callbackURL: "https://ubervoice.herokuapp.com/auth/uber/callback"
  },
    function(accessToken, refreshToken, profile, done) {
      console.log("Access Token: "+accessToken);
      console.log("Refresh Token: "+refreshToken);
      console.log("Profile: "+util.inspect(profile));

      User.findOrCreate(
        { 
          uber_id: profile.id,
          accessToken: accessToken,
          refreshToken: refreshToken,
          first_name:profile.first_name,
          last_name:profile.last_name,
          promo_code:profile.promo_code,
          uber_id:profile.uuid,
          provider:profile.provider,
          email:profile.email

        }, function (err, user) {
        return done(err, user._id);
      });
      
    }

  ));

  //Configure routes
  require('./routes')(app);

  console.log("ubervoice: ready to accept requests".green);

});
