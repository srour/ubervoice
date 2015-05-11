var util = require('util');
var User = require('../models').User;
var request = require('request-json');
var client = request.createClient('https://sandbox-api.uber.com');
var google = request.createClient('https://maps.googleapis.com');

var createResponse = function(outputText,endSession){

	var response = {};
	response.version = "1.0";

	response.response = {
		"outputSpeech" : {
			"type":"PlainText",
			"text":outputText
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

			if(Request.request.type == 'IntentRequest' && Request.request.intent.name == 'Pair'){
				console.log('Pairing request');
				console.log('Slot value: '+Request.request.intent.slots.Code.value);

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
			}
			else{
				response.json(createResponse('You need to pair with your Uber account first.',true));
			}
			
		}
		else{
			console.log('Authenticated Uber user:'+user);
			client.headers['Authorization'] = 'Bearer '+user.accessToken;

			switch(Request.request.type){
		
				case 'LaunchRequest':
					response.json(createResponse("Say get me an Uber",false));
					break;
		
				case 'IntentRequest':
					console.log("Intent: "+Request.request.intent.name);
					console.log("Slots: "+util.inspect(Request.request.intent.slots));
					
					switch (Request.request.intent.name){

						case 'Cancel':
							console.log("Cancel uber request");
							if(!user.request_id){
								response.json(createResponse("You have not requested an uber."),true);
							}
							else{

								client.del('/v1/requests/'+user.request_id,function(err,res,body){
									console.log("Cancelled uber request: "+user.request_id);
									user.request_id = undefined;
									user.save();
									response.json(createResponse("Cancelled your request for an Uber."),true);
								});
							}

							break;

						case 'Status':
							if(!user.request_id){
								console.log('No outstanding Uber requests.');
								response.json(createResponse("You have not requested any Ubers. Say Get me an uber to order an Uber.",false));
							}
							else{
								console.log('Using access token: '+user.accessToken);
								client.get('/v1/requests/'+user.request_id, function(err, res, body) {
										console.log('Request status');
										console.log(body);

										if(body.status == 'accepted'){
											var responseText = 'Your driver '+body.driver.name+' is on the way in a '+body.vehicle.make+' '+body.vehicle.model+ ' They will be here in '+body.eta+' minutes';

							 				response.json(createResponse(responseText,true));
										}
										else if(body.status=='processing'){
											response.json(createResponse("Your uber request is still getting processed. It should be here in "+body.eta +" minutes",true));
										}
										else{
											response.json(createResponse("Check the log",true));
										}
										
									});
							}
							break;

						case 'GetUber':

							//Check to see if a request is already pending
							var reply_sent = false;
							if(user.request_id){
								console.log('Existing request found. Checking status...');
								client.get('/v1/requests/'+user.request_id, function(err, res, body) {
										console.log('Request status: '+body);
										
										if(body.code == 'not_found'){
											user.request_id = undefined;
											user.save();
										}
										
										else if(body.status == 'completed'){
											console.log('Request was completed. Clearing request ID.');
											user.request_id = undefined;
											user.save();
										}
										else if(body.status == 'accepted'){
											var responseText = 'Your driver '+body.driver.name+' is on the way in a '+body.vehicle.make+' '+body.vehicle.model+ ' They will be here in '+body.eta+' minutes';
							 				response.json(createResponse(responseText,true));
							 				reply_sent = true;
										}
										else if(body.status=='processing'){
											reply_sent = true;
											response.json(createResponse("Your uber request is still getting processed. It should be here in "+body.eta+" minutes",true));
										}
										else{
											//TODO HANDLE MORE STATUS
											reply_sent = true;
											response.json(createResponse("Check the log",true));
										}
										
									});
							}
							
							if(reply_sent)
								break;


							var address = user.street_address+", "+user.city_address+", "+user.state_address+" "+user.zipcode_address;

							console.log("Reverse lookup on user address: "+address);
							google.get('/maps/api/geocode/json?address='+address, function(err, res, body) {
								console.log(util.inspect(body, {depth:null}));

								var data = {
									scope: 'request',
									start_longitude:body.results[0].geometry.location.lng,
									start_latitude:body.results[0].geometry.location.lat,
									product_id:user.product_id_preference,
								};
								console.log('Request is: '+data);

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
										response.json(createResponse("An occurred ordering the Uber. Try again later.",true));
									}
								
								});

							});

						

							break;

					}

				}
		}
	});

}








	