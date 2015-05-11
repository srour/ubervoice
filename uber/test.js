var uber = require("uber-api")({bearer_token:'82JKF4kq720GY7O15mqjrUEPDueAOb',versin:'v1'});

uber.getProducts('47.613940', '-122.31709', function(error, response) {
	console.log(response);
});


