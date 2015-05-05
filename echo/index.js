var util = require('util');
var User = require('../models').User;
var request = require('request-json');
var client = request.createClient('https://sandbox-api.uber.com');


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

						var data = {
							scope: 'request',
							start_longitude: '-122.31709',
							start_latitude:'47.613940',
							product_id:'6450cc0f-4d39-4473-8632-1e2c2049fefe',
						};

						//client.headers['Authorization'] = 'Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu';
						console.log('Using access token: '+user.accessToken);
						client.headers['Authorization'] = 'Bearer '+user.accessToken;

						client.post('/v1/requests', data, function(err, res, body) {
							
							console.log(body);
							if(res.statusCode==202){
								response.json(createResponse("Your uber is on its way. It will be here in 10 minutes",true));
							}
							
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








	