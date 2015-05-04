var main = require('./main');
var echo = require('../echo');

module.exports = function(app) {

	app.get('/',main.index);
	
	app.post('/',main.handleEchoRequest);

	app.get('*', function(req, res){
		res.render('404');
	});

}


