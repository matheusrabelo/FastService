# Fastservice
[![npm version](https://badge.fury.io/js/fastservice.svg)](https://badge.fury.io/js/fastservice) [![Build Status](https://travis-ci.org/matheusrabelo/FastService.svg?branch=master)](https://travis-ci.org/matheusrabelo/FastService)

## About
A lightweight library for creating **robust microservice architectures** on NodeJS.
The main idea behind is sharing data under Redis connections.

This library allows you to create different services (including on different Node instances) that can exchange computed data between each other.

This might be useful for creating a Promise that another Node instance will resolve or reject.

## How to install
This library is distributed on **npm**. To install, run the following command:
```bash
$ npm install fastservice --save
```

## Configuring
All configurations are based on **IoRedis** library. You can see more detailed here:
```
https://www.npmjs.com/package/ioredis
```

### An example of valid constructor

```json 
{
    "redis": {
        "host": "127.0.0.1",
        "port": "6379"
    }
}
```

## Consuming a microservice

```javascript
const Fastservice = require('fastservice');
const config = require('./config');
const express = require('express');

const app = express();
const service = new Fastservice(config);
const port = 8088;

app.post('/login', (request, response) => {
    // This application will pass the responsibility to handle
    // login to a different service
    service.handle('login', request.body)
        .then((result) => {
            if (result.success) {
                response.status(200)
                    .json({ 
                        success: true, 
                        message: 'Successfully logged in'
                    });
            }
            response.status(401)
                    .json({
                        success: false,
                        message: 'Login or password incorrect'
                    });
        })
        .catch((result) => {
            response.status(500)
                    .json({
                        success: false,
                        message: 'Some server internal error'
                    });
        });
});

app.listen(port);
```

## Creating a microservice

```javascript
const Fastservice = require('fastservice');
const config = require('./config');
const service = new Fastservice(config);

// This application will create a service called login
service.serve('login', (value) => {
    return new Promise((resolve, reject) => {
        // Any async task here
        const { login, password } = value;
        if (login === 'matheus' && password === '123') {
            resolve({ success: true });
        }
        resolve({ success: false });
    });
});
```

## Usage

First, we need to start a Redis server.

```bash
$ redis-server
```

For serving a microservice and a consumer, we can use the examples above.

```bash
$ node creating.js
``` 

```bash
$ node webapi.js
```

Now everything works properly and we can use it as any other Web API.

```bash
$ curl -X POST -H "Content-Type: application/json" -d '{
	"login": "matheus",
	"password": "234"
}' "http://localhost:8088/login"
```

## Scripts
- Use **npm run start** to start developing
- Use **npm run test** to run tests

## Technologies
NodeJS, Typescript and IoRedis.

## License
MIT

## Author
Matheus Freire Rabelo