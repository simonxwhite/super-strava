'use strict';

const Hapi = require('hapi');
const Inert = require('inert');
const request = require('request');
const path = require('path');

const server = new Hapi.Server();

// const host = '0.0.0.0';
const port = process.env.PORT || 3000;

server.connection({
  // host: host,
  port: port,
  routes: {
    files: {
      relativeTo: __dirname
    }
  }
});

server.register(Inert, (err) => {
  if (err) {
    throw err;
  }

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/token_exchange',
    handler: tokenExchangeHandler
  });
});

server.start((err) => {
  if (err) {
    throw err;
  }

  console.log('Server running at:', server.info.uri);

  console.log('  __dirname:', __dirname);
  console.log('  process.cwd():', process.cwd());

  console.log('  path.resolve("__dirname"):', path.resolve(__dirname));
  console.log('  path.resolve("."):', path.resolve('.'));
});

function tokenExchangeHandler(req, reply) {
  const url = 'https://www.strava.com/oauth/token?client_id=6656&client_secret=3d351cf4f8e67814f6b33959bb82ba9739728cfe&code=' + req.query.code;

  console.log('tokenExchangeHandler():', JSON.stringify(req.query));

  request.post(url, (error, response, body) => {
    const token = response.statusCode === 200 ? JSON.parse(body).access_token : 'error';

    console.log('tokenExchangeHandler(): token -', token);
    reply.redirect('index.html?token=' + token);
  });
}
