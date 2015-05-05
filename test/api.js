request = require('request-json');
var client = request.createClient('https://sandbox-api.uber.com');

var data = {
  scope: 'request',
  start_longitude: '-122.31709',
  start_latitude:'47.613940',
  product_id:'6450cc0f-4d39-4473-8632-1e2c2049fefe',
};

client.headers['Authorization'] = 'Bearer m4Nbvp50EFwNs9ZNPv59a8xep0mDhw';

client.post('/v1/requests', data, function(err, res, body) {
	console.log(body);
  return console.log(res.statusCode);
});

