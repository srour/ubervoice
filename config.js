//configuration

var config = {};

//web configuration

//Serve public html from this directory (following grunt build)
config.public = 'build';

config.port = process.env.PORT || '3000';
config.hostname = require('os').hostname()+':'+config.port;

//logging configuration
config.logging = {};
config.logging.file = 'logs/logfile.txt';

//mongodb config
config.db = process.env.MONGOLAB_URI || 'mongodb://heroku_app36515086:70ggad9miqevk7jvvkfqnqnh52@ds031902.mongolab.com:31902/heroku_app36515086'; 

module.exports = config;