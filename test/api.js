request = require('request-json');
var client = request.createClient('https://sandbox-api.uber.com');

var data = {
  scope: 'request',
  start_longitude: '-122.31709',
  start_latitude:'47.613940',
  product_id:'6450cc0f-4d39-4473-8632-1e2c2049fefe',
};

client.headers['Authorization'] = 'Bearer JAK0K7bUXUZYrDesqz6Tgrc4DUAkYm';

client.get('/v1/products?latitude=47.613940&longitude=-122.31709', function(err, res, body) {
	console.log(body);
  return console.log(res.statusCode);
});

