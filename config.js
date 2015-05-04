//configuration

var config = {};

//web configuration
//Serve public html from this directory (following grunt build)
config.public = 'build';

config.port = process.env.PORT || '3000';
config.hostname = process.env.FAVENS_ROOT || require('os').hostname()+':'+config.port;

//logging configuration
config.logging = {};
config.logging.file = 'logs/logfile.txt';

module.exports = config;