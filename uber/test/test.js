var Uber = require('index.js');

var uber = new Uber({accessToken:'82JKF4kq720GY7O15mqjrUEPDueAOb'});

uber.order('6450cc0f-4d39-4473-8632-1e2c2049fefe','47.613940','-122.31709',function(err,result){
	console.log(result);
});