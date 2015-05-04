var main = require('./main');

module.exports = function(app) {

	app.get('/',main.index);
	

	//Handle 404 pages
	app.get('*', function(req, res){
		res.render('404');    
	});

}
