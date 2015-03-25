var path = require('path');
var betturl = require('betturl');

module.exports = function(redis) {
  var builder = function(config) {
    if (config === null || config === undefined) { config = {}; }
    if (typeof(config) === 'string') { config = {url: config}; }
    
    var urlConfig = config.url ? module.exports.parseURL(config.url) : {};
    
    var host = urlConfig.host || config.host;
    var port = urlConfig.port || config.port;
    var database = urlConfig.database || config.database;
    var password = urlConfig.password || config.password;
    
    var client = redis.createClient(port, host, config.options);
    if (password) { client.auth(password); }
    if (database) { client.select(database); }
    
    return client;
  };
  
  builder.parseURL = module.exports.parseURL;
  
  return builder;
};

module.exports.parseURL = function(url) {
  var parsed = betturl.parse(url);
  
  var config = {
    host: parsed.host || 'localhost',
    port: parsed.port || 6379,
  };
  
  if (parsed.auth) { config.password = parsed.auth.password; }
  
  var database = parsed.path.slice(1);
  if (database) {
    if (parseInt(database).toString() !== database.toString()) {
      throw new Error('Database must be an integer');
    }
    config.database = parseInt(database);
  }
  
  return config;
};
