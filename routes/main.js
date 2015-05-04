var path = require('path');

exports.index = function(req,res){

  res.sendfile(path.resolve(__dirname + '/../build/views/index.html'));
  
}

exports.startSession = function(req,res){

	console.log(req.body);

	//var request = JSON.parse(req.)
	res.end(createResponse({});
}

exports.createResponse = function(data){

	return '{
  "version": "1.0",
  "sessionAttributes": {
    "supportedHoriscopePeriods": {
      "daily": true,
      "weekly": false,
      "monthly": false
    }
  },
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
    },
    "card": {
      "type": "Simple",
      "title": "Horoscope",
      "subtitle": "Virgo - Daily",
      "content": "Today will provide you a new learning opportunity.  Stick with it and the possibilities will be endless."
    },
    "shouldEndSession": true
  }
}';

}