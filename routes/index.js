var main = require('./main');
var echo = require('../echo');
var passport = require('passport');

module.exports = function(app) {

	app.get('/',main.index);
  app.get('/logout',main.logout);
		
	app.get('/auth/uber', passport.authenticate('uber'));
	app.get('/auth/uber/callback', passport.authenticate('uber', { failureRedirect: '/login' }),
  	function(req, res) {
  		console.log("Succesful auth with Uber");

    	// Successful authentication, redirect home.
    	if(req.user){
    		console.log("req.user is set here");
    	}
    	res.redirect('/');
  	}
  );

	app.post('/',main.handleEchoRequest);

}


