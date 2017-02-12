# Fastservice
[![Build Status](https://travis-ci.org/matheusrabelo/FastService.svg?branch=master)](https://travis-ci.org/matheusrabelo/FastService)

## About
A lightweight library for creating **robust microservice architectures** on NodeJS.
The main idea behind is sharing data under Redis connections.

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

### An example of valid configuration

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
import fastservice from 'fastservice';
import config from './config';
import express from 'express';

const app = express();
const service = fastservice(config);

app.post('/login', (request, response) => {
    service.handle('login', request.body)
        .then((result) => {
            if (result.success) {
                response.status(200)
                    .json({ 
                        success: true, 
                        message: 'Successfully logged'
                    });
            }
            response.status(400)
                    .json({
                        success: 401,
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
```

## Creating a microservice

```javascript
import fastservice from 'fastservice';
const service = fastservice(config);

service.serve('login', (value) => {
    return new Promise((resolve, reject) => {
        // Any async task here
        const { login, password } = value;
        if (login === 'matheus' && password === '123') {
            resolve({ success: true });
        }
        reject({ success: false });
    });
});

```

##Scripts
- Use **npm run start** to start developing
- Use **npm run test** to run tests

##Technologies
NodeJS, Typescript and IoRedis.

##License
MIT

## Author
Matheus Freire Rabelo