var path = require('path');
var echo = require('../echo');

exports.index = function(req,res){
  if(res)
    console.log('response object defined');
  
  if(!req.user){
    console.log('User is not authenticated. Rendering welcome page.');
    res.sendFile(path.resolve(__dirname + '/../build/views/index.html'));
  }
  else{
    console.log('User is logged in!');
    res.sendFile(path.resolve(__dirname + '/../build/views/main.html'));
  }
  
}

exports.handleEchoRequest = function(req,res){
	console.log(echo.handleEchoRequest);
	echo.handleEchoRequest(req,res);

}
