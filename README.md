

Integrate with Uber API
Authenticate with Uber API
Set location


Features they need:
- Notifications
- Address



Scratch
curl -H 'Authorization: Bearer LHzZvts40daLrcpIC4wAcQxirdrsFj' 'https://api.uber.com/v1/products?latitude=37.7759792&longitude=-122.41823'


curl -H 'Authorization: Bearer LHzZvts40daLrcpIC4wAcQxirdrsFj' --data 'scope=profile,history,request&product_id=d4abaae7-f4d6-4152-91cc-77523e8165a4&start_latitude=47.613940&start_longitude=-122.31709' 'https://sandbox-api.uber.com/v1/requests'

curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://api.uber.com/v1/requests?scope=request&product_id=d4abaae7-f4d6-4152-91cc-77523e8165a4&start_latitude=47.613940&start_longitude=-122.31709'


curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://api.uber.com/v1/me'

curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://api.uber.com/v1.2/history' 


curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://api.uber.com/v1/estimates/price?start_latitude=47.613940&start_longitude=-122.31709&end_latitude=47.6770&end_longitude=-122.3871803' 

curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://sandbox-api.uber.com/v1/requests?start_latitude=47.613940&start_longitude=-122.31709&end_latitude=47.6770&end_longitude=-122.3871803&scope=requests'

curl -H 'Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu' 'https://api.uber.com/v1/products?latitude=47.613940&longitude=-122.31709'

curl -X "POST" "https://api.uber.com/v1/requests" -H "Content-Type: application/json" -H "Authorization: Bearer 2NCvx3hZIun26qVA0xhE4bXJZhf7bu" -d "{\"scope\":\"request\", \"start_longitude\":\"-122.31709\", \"start_latitude\":\"47.613940\",\"product_id\":\"6450cc0f-4d39-4473-8632-1e2c2049fefe\"}"

curl -X "POST" "https://api.uber.com/v1/requests/<REQUEST_ID>" \
  -H "Authorization: Bearer <OAUTH TOKEN>" \
  -d "{\"status\":\"accepted\"}"


POST /v1/requests

product_id	string	The unique ID of the product being requested.
start_latitude	float	The beginning or "pickup" latitude.
start_longitude	float	The beginning or "pickup" longitude.
end_latitude	float	The final or destination latitude.
end_longitude	float	The final or destination longitude.

