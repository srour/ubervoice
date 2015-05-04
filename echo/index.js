

module.exports = function() {

//	respond
	
	var createResponse = function(){
		var response = {};

		return response;
	}

	exports.handleEchoRequest = function(request,response){
		var Request = request.body;

		console.log('Request type:'+Request.request.type);

		if(Request.request.type == 'LaunchRequest'){
			console.log(Request.request.requestId);
		}

		response.end(createResponse());

	}


}



/* 

 //express middleware?
	
 var echo = require('echo');

 echo.
 echo.launchRequest(function(request,response){

  
 });

 echo.intentRequest(function()



// Request Format
// LaunchRequest
// IntentRequest
// SessionEndedRequest
// Response Format


exports.createResponse = function(data){

	var data = " \
\
	{ \'version\': '1.0', \ 
  'sessionAttributes': { \ 
    'supportedHoriscopePeriods': { \ 
      'daily': true, \ 
      'weekly': false, \ 
      'monthly': false \
    } \
  }, \
  'response': { \
    'outputSpeech': { \
      'type': 'PlainText', \
      'text': 'Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless.' \
    }, \ 
    'card': { \
      'type': 'Simple', \
      'title': 'Horoscope', \
      'subtitle': 'Virgo - Daily', \
      'content': 'Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless.' \
    }, \
    'shouldEndSession': true \
  } \
}";

	return data;
}

*/


	