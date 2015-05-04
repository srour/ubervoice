

//	respond

var createResponse = function(outputText){
	/*

{
  "version": "string",
  "sessionAttributes": {
    "string": object
  },
  "response": {
    "outputSpeech": {
      "type": "string",
      "text": "string"
    },
    "card": {
      "type": "string",
      "title": "string",
      "subtitle": "string",
      "content": "string"
    },
    "shouldEndSession": boolean
  }
}

	*/

	var response = {};
	response.version = "1.0";
	response.sessionAttributes = {
		"test":"foobar"
	};
	response.response = {
		"outputSpeech" : {
			"type":"PlainText",
			"text":outputText
		},
		"card" : {
			"type":"Simple",
			"title":"card title",
			"subtitle":"string",
			"content":"string"
		},
		"shouldEndSession": false
	};

	console.log(response);

	return response;
}

exports.handleEchoRequest = function(request,response){
	var Request = request.body;

	console.log('Request type:'+Request.request.type);

	if(Request.request.type == 'LaunchRequest'){
		console.log("RequestID: "+Request.request.requestId);
		response.json(createResponse("Hello"));

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


{
  "version": "string",
  "sessionAttributes": {
    "string": object
  },
  "response": {
    "outputSpeech": {
      "type": "string",
      "text": "string"
    },
    "card": {
      "type": "string",
      "title": "string",
      "subtitle": "string",
      "content": "string"
    },
    "shouldEndSession": boolean
  }
}


*/


	