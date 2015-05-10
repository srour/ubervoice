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

	User.findOne({amazon_id:Request.session.user.userId},function(err,user){
		if(err) response.json(createResponse("Sorry an error occurred. Try again later."));
		else if(!user){
			console.log('No user found. Pairing operating has not happened yet.');
			console.log('AmazonUserId: '+Request.session.user.userId);
			response.json(createResponse('You need to pair with your Uber account first.'));
		}
		else{
			console.log('Authenticated Uber user:'+user);
			client.headers['Authorization'] = 'Bearer '+user.accessToken;

			switch(Request.request.type){
		
				case 'LaunchRequest':
					response.json(createResponse("Say get me an Uber",false));
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
							User.findOneAndUpdate({'setupCode':Request.request.intent.slots.Code.value},{amazon_id:Request.session.user.userId},function(err,user){
								if(!user){
									console.log("Error pairing! code was: "+Request.request.intent.slots.Code.value);
									response.json(createResponse("I could not find that pairing code. Try pairing again",false));
								}
								else{
									response.json(createResponse("Pairing complete. Say Get me an Uber to order an Uber" , false));	
								}
							
							});
							break;

						case 'Status':
							if(!user.request_id){
								console.log('No outstanding Uber requests.');
								response.json(createResponse("You do not have any outstanding Uber requests."));
							}
							else{
								console.log('Using access token: '+user.accessToken);
								client.get('/v1/requests/'+user.request_id, function(err, res, body) {
										console.log('Request status');
										console.log(body);

										if(body.status == 'accepted'){
											var responseText = 'Your driver '+body.driver.name+' is on the way in a '+body.vehicle.make+' '+body.vehicle.model+'. ';
											responseText+= 'They will be here in '+body.eta+' minutes'.
							 				response.json(createResponse(responseText));
										}
										else if(body.status=='processing'{
											response.json(createResponse("Your uber request is still getting processed. It should be here in "+body.eta));
										}
										else{
											response.json(createResponse("Check the log"));
										}
										
									});
							}
							break;

						case 'GetUber':

							var data = {
								scope: 'request',
								start_longitude: '-122.31709',
								start_latitude:'47.613940',
								product_id:'6450cc0f-4d39-4473-8632-1e2c2049fefe',
							};

							client.post('/v1/requests', data, function(err, res, body) {
								
								console.log(body);
								if(res.statusCode==202){
									console.log('Uber ordered: '+body);
									user.request_id = body.request_id;
									user.save();
									response.json(createResponse("Your uber is on its way. It will be here in "+body.eta+" minutes",true));
								}
								else{
									console.log('An error occurred ordering the uber: '+err);
									console.log(body);
									response.json(createResponse("An occurred ordering the Uber. Try again later."));
								}
								
							});
							break;

					}

				}
		}
	});

}









	