var path = require('path');
var echo = require('../echo');

exports.index = function(req,res){

  res.sendfile(path.resolve(__dirname + '/../build/views/index.html'));
  
}

exports.handleEchoRequest = function(req,res){
	echo.handleEchoRequest(req,res);

}