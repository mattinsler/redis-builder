# redis-builder

Easily create/configure a redis client

## Installation
```
npm install redis-builder
```

## Usage

```javascript
var redis = require('redis');
var builder = require('redis-builder')(redis);

// create a default client
var client = builder();

// create a client from a URL
var client = builder({url: 'redis://ignored:password@host:port/database-id'});

// create a client from a URL with options (passed to the redis.createClient)
var client = builder({
  url: 'redis://ignored:password@host:port/database-id',
  options: {
    detect_buffers: true
  }
});

// create a client from properties
var client = builder({
  host: 'something.com',             // defaults to 'localhost'
  port: 15000,                       // defaults to 6379
  database: 1,                       // optional
  password: 'password',              // optional
  options: {                         // optional
    detect_buffers: true
  }
});

// for fun, just parse a redis URL to see what redis-builder is using
console.log(builder.parseURL('redis://:password@foo.bar.com:88731/4'));

/*
should print:
{
  host: 'foo.bar.com',
  port: 88731,
  password: 'password',
  database: 4
}
*/
```

## License
Copyright (c) 2013 Matt Insler  
Licensed under the MIT license.
