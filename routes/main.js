var path = require('path');

exports.index = function(req,res){

  res.sendfile(path.resolve(__dirname + '/../build/views/index.html'));
  
}

exports.startSession = function(req,res){

	console.log(req);
	res.end({});
}