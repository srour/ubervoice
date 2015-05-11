var main = require('./main');
var passport = require('passport');

module.exports = function(app) {
  app.post('/',main.handleEchoRequest);
  app.post('/updateUserInfo',main.updateUserInfo);
  app.post('/unlink',main.unlinkAccount);

	app.get('/',main.index);
  app.get('/logout',main.logout);
	app.get('/auth/uber', passport.authenticate('uber'));
	app.get('/auth/uber/callback', passport.authenticate('uber', { failureRedirect: '/login' }),
  	function(req, res) {
  		console.log("Succesful auth with Uber");
    	res.redirect('/');
  	}
  );

}