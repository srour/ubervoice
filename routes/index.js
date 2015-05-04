var main = require('./main');

module.exports = function(app) {

	app.get('/',main.index);
	
	app.post('/',main.startSession);
	
	app.get('*', function(req, res){
		res.render('404');
	});

}
