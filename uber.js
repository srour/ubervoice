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
  console.log('Callback URI:'.bold+config.uberCallbackUri);

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
    clientID: config.uberClientId,
    clientSecret: config.uberSecret,
    callbackURL: config.uberCallbackUri,
    scope: 'request profile'
  },
    function(accessToken, refreshToken, profile, done) {
      console.log("Access Token: "+accessToken);
      console.log("Refresh Token: "+refreshToken);
      console.log("Profile: "+util.inspect(profile));

      //Find an existing user, and if found update the access token
      User.findOneAndUpdate({ 'email': profile.email }, {accessToken:accessToken}, {new:true}, function (err, user) {
        if(!user){
          //if user is not found:
          var user = new User({ 
            uber_id: profile.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
            first_name:profile.first_name,
            last_name:profile.last_name,
            promo_code:profile.promo_code,
            uber_id:profile.uuid,
            provider:profile.provider,
            email:profile.email
          });
          user.save(function(err,user){
            console.log('Created new user: '+user);
            return done(err, user._id);
          });

        }
        else if(user){
          console.log('Existing user found. Updated access token:'+user);
          return done(err, user._id);
        }
        else{
          console.log('Error occurred:'+err);
          return done(err,undefined);
        }

      });
      
    }

  ));

  //Configure routes
  require('./routes')(app);

  console.log("ubervoice: ready to accept requests".green);

});


