const Hapi = require('@hapi/hapi');
const path = require('path');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const inert = require('@hapi/inert');
const routes = require('./src/routes');
const { auth } = require('./src/utils');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: 'localhost',
    routes: {
      files: { relativeTo: path.join(__dirname, 'public') },
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with'],
      },
    },
  });

  await server.register([{ plugin: hapiAuthJwt2 }, { plugin: inert }]);
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.APP_SECRET_KEY,
    validate: auth.verifyToken,
  });
  server.auth.default('jwt');
  server.route(routes);
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
