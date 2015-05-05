var path = require('path');
var echo = require('../echo');
var User = require('../models').User;
var request = require('request');

exports.index = function(req,res){
  if(res)
    console.log('response object defined');

  
  if(!req.user){
    console.log('User is not authenticated. Rendering welcome page.');
    res.sendfile(path.resolve(__dirname + '/../build/views/index.html'));
  }
  else{
    console.log('User is logged in!');

    if(!req.user.setupCode){

      //Generate small number
      var setupCode = randomIntInc(0,100);
      console.log('Setup pairing code is: '+setupCode);

      User.findOneAndUpdate({ 'email': req.user.email }, {setupCode:setupCode}, function (err, user) {
        res.render('main.ejs',{code: setupCode});
      });

    }
    else{
      res.render('main.ejs',{});

    }

  }
  
}

exports.handleEchoRequest = function(req,res){
	console.log(echo.handleEchoRequest);
	echo.handleEchoRequest(req,res);
}

exports.logout = function(req,res){
  req.logout();
  res.redirect('/');
}

function randomIntInc (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}
