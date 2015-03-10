var path = require('path');
var betturl = require('betturl');

module.exports = function(redis) {
  return function(config) {
    if (config === null || config === undefined) { config = {}; }
    if (typeof(config) === 'string') { config = {url: config}; }
    
    var urlConfig;
    if (config.url) { urlConfig = betturl.parse(config.url); }
    
    var host = (urlConfig ? urlConfig.host : config.host) || 'localhost';
    var port = (urlConfig ? urlConfig.port : config.port) || 6379;
    var database = urlConfig ? urlConfig.path.slice(1) : config.database;
    var password = urlConfig && urlConfig.auth ? urlConfig.auth.password : config.password;
    
    var client = redis.createClient(port, host, config.options);
    if (password) { client.auth(password); }
    
    if (database) {
      if (parseInt(database).toString() !== database.toString()) {
        throw new Error('Database must be an integer');
      }
      client.select(parseInt(database));
    }
    
    return client;
  };
};
