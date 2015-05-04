

/*

	var Uber = require('uber-api')({
	server_token:'9yYf7Ku4dN_aQnm-Bqw_GORtjvjo_oTfbk82oThM',
	version:'v1',
	bearer_token:'YOUR BEARER TOKEN'
}),
    lat = 36,
    lon = -94;

Uber.getProducts(lat, lon, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});

Uber.getMe(function(err){
	console.log(err);
});

*/



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
	console.log(request.body);

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

				case 'Pair':


					response.json(createResponse("Connected with your uber account", false));
					break;


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


	