var util = require('util');
var request = require('request-json');

var client = request.createClient('https://maps.googleapis.com');

var data = {
  address: '1433 12th Ave, Seattle, WA 98122',
  sensor:false,
  key:'AIzaSyDdNfOWyxc7V2hTgPaKJzhcjBe35smRzo4'
};


client.get('/maps/api/geocode/json?address=1433 12th Ave, Seattle, WA 98122', function(err, res, body) {
	console.log(util.inspect(body, {depth:null}));
	console.log(body.results[0].geometry.location.lat);
  return console.log(res.statusCode);
});

