
'use strict';

const Hapi = require('hapi');
const config = require('config');
const _ = require('lodash');

const users = require('../handlers/users');

const routesUsers = require('../routes/users');
const routesTranslations = require('../routes/translations');

const privateKey = config.get('jwt_private_key');

const init = async () => {
  const server = new Hapi.Server({
    port: config.get('connection.port'),
    host: config.get('connection.host'),
    routes: { cors: true }
  });

  // include our module here ↓↓
  await server.register(require('hapi-auth-jwt2'));

  server.auth.strategy('jwt', 'jwt',
    { key: privateKey,
      validate: users.validateJwtToken
    });

  server.auth.default('jwt');

  let allRoutes = _.concat(
    routesUsers,
    routesTranslations
  );

  server.route(allRoutes);

  await server.start();
  return server;
};


init().then(server => {
  console.log('Server running at:', server.info.uri);
})
.catch(error => {
  console.log(error);
});

