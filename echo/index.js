
var util = require('util');
var User = require('../models').User;


	/*
Uber.getProducts(lat, lon, function(error, response) {
  if (error) {
    console.log(error);
  } else {
    console.log(response);
  }
});
*/



var createResponse = function(outputText,endSession){

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
			console.log("Slots: "+util.inspect(Request.request.intent.slots));

			switch (Request.request.intent.name){

				case 'Pair':

					//Lookup user with that code
					if(Request.request.intent.slots.Code.value == 7){
						User.findOneAndUpdate({ 'email': 'bsrour@gmail.com' }, {amazon_id:Request.session.user.userId}, function (err, user) {
  						if (err) response.json(createResponse("Sorry an error occurred" , true));
  						response.json(createResponse("Connected with your uber account bsrour @ gmail.com. Say Get me an uber to order an Uber." , false));
						});
					}

					break;


				case 'GetUber':
					//Call Uber API here
					User.findOne({amazon_id:Request.session.user.userId},function(err,user){
						console.log('Found authenticated Uber user:'+user);

						var Uber = require('uber-api')({
							version:'v1',
							bearer_token:user.accessToken
						});

						Uber.getMe(function(err){
							console.log(err);
							
							response.json(createResponse("Your uber is on its way. It will be here in 10 minutes",true));

						});

					});

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


	