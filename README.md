# redis-builder

Easily create/configure a redis client

## Installation
```
npm install redis-builder
```

## Usage

```javascript
var builder = require('redis-builder');

// create a default client
var client = builder();

// create a client from a URL
var client = builder({url: 'redis://ignored:password@host:port/database-id'});

// create a client from properties
var client = builder({
  host: 'something.com',             // defaults to 'localhost'
  port: 15000,                       // defaults to 6379
  database: 1,                       // optional
  password: 'password',              // optional
});
```

## License
Copyright (c) 2013 Matt Insler  
Licensed under the MIT license.
