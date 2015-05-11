//Setup and connect to Database
var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate')

var Configuration = require('../config');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var db = mongoose.connection;
var colors = require('colors');

mongoose.connect(Configuration.db, { strict:false, fsync:true});

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function callback () {
  console.log("Connected to MongoDB: ".blue+Configuration.db.blue);  
});

//Define User Model
var userSchema = mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  lastsignin: Date,
  created: { type: Date, default: Date.now},
  accessToken: String,
  refreshToken: String,
  picture:String,
  uber_id:String,
  promo_code:String,
  provider:String,
  setupCode:String,
  amazon_id:String,
  request_id:String,
  street_address:String,
  city_address:String,
  state_address:String,
  zipcode_address:String,
  real_request:Boolean,
  product_id_preference:String
});

userSchema.plugin(findOrCreate);

var User = mongoose.model('User', userSchema);
module.exports.User = User;

