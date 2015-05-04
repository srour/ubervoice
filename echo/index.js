

//	respond

//Store our sessions here
var sessionStore = {};


var Uber = require('node-uber');

var uber = new Uber({
  client_id: 'tzuBSK917EYVpOWD9dQhhiA1Qr18Peh6',
  client_secret: 'GFbj58hxhLGY7Esuvn2kKkYyVV2a1iAg4VACl5d-',
  server_token: '9yYf7Ku4dN_aQnm-Bqw_GORtjvjo_oTfbk82oThM',
  redirect_uri: 'REDIRECT URL',
  name: 'SrourEchoFun'
});


var createResponse = function(outputText,endSession){
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
		"shouldEndSession": endSession
	};

	console.log(response);

	return response;
}

exports.handleEchoRequest = function(request,response){
	var Request = request.body;

	console.log('Request type:'+Request.request.type);

	switch(Request.request.type){
		case 'LaunchRequest':
			console.log("RequestID: "+Request.request.requestId);
			response.json(createResponse("Say get me an uber to order an Uber",false));
			break;
		case 'SessionEndedRequest':
			//Remove session from session store
			console.log('End session reason: '+Request.request.reason);
			response.json(createResponse("Goodbye"));
			break;
		case 'IntentRequest':
			
			console.log("Intent: "+Request.request.intent.name);
			console.log("Slots: "+Request.request.intent.slots);

			switch (Request.request.intent.name){
				
				case 'GetUber':
					//Call Uber API here
					response.json(createResponse("Your uber is on its way. It will be here in 10 minutes",true));
					break;

				default:
					response.json(createResponse("Sorry I had trouble understanding you"));
					break;

			}

			break;

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


	