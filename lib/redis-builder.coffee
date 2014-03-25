path = require 'path'
betturl = require 'betturl'

try
  redis = require path.join(process.cwd(), 'node_modules', 'redis')
catch err
  console.log '\nYou must npm install redis in order to use redis-builder\n'
  throw err


build = (config = {}) ->
  return config.client if config.client?
  
  url_config = betturl.parse(config.url) if config.url?
  
  host = url_config?.host or config.host or 'localhost'
  port = url_config?.port or config.port or 6379
  database = url_config?.path.slice(1) || config.database
  password = url_config?.auth?.password || config.password
  
  client = redis.createClient(port, host, config.options)
  client.auth(password) if password?
  
  if database?
    throw new Error('Database must be an integer') unless parseInt(database).toString() is database.toString()
    client.select(parseInt(database))
  
  client

module.exports = build
