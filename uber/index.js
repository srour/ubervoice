var request = require('request-json');
var sandboxClient = request.createClient('https://sandbox-api.uber.com');

var authToken = '';
function uber(options) {
  options = options || {};
  accessToken = options.accessToken;
  sandboxClient.headers['Authorization'] = 'Bearer '+accessToken;

  console.log(options);
}

uber.prototype.order = function(product_id, start_latitude,start_longitude,callback){

	var data = {
		scope: 'request',
		start_longitude: start_longitude,
		start_latitude:start_latitude,
		product_id:product_id,
	};

	sandboxClient.post('/v1/requests', data, function(err, res, body) {
							
		console.log(body);
		if(res.statusCode==202){
			console.log('Uber ordered: '+body);
			callback(undefined,body);
		}
		else{
			console.log('An error occurred ordering the uber: '+err);
			console.log(body);
			callback(err,body);
		}
	
	});

}


module.exports = uber;