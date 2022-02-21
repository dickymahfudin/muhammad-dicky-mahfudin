const Hapi = require('@hapi/hapi');
const path = require('path');
const hapiAuthJwt2 = require('hapi-auth-jwt2');
const inert = require('@hapi/inert');
const routes = require('./routes');
const { auth } = require('./utils');
require('dotenv').config();

const handler = async () => {
  const server = Hapi.server({
    port: process.env.APP_PORT || 3000,
    host: 'localhost',
    routes: {
      files: { relativeTo: path.join(path.resolve('./'), 'public') },
      cors: true,
    },
  });

  await server.register([{ plugin: hapiAuthJwt2 }, { plugin: inert }]);
  server.auth.strategy('jwt', 'jwt', {
    key: process.env.APP_SECRET_KEY,
    validate: auth.verifyToken,
  });
  server.auth.default('jwt');
  server.route(routes);
  return server;
};

const init = async () => {
  const server = await handler();

  await server.initialize();
  return server;
};

const start = async () => {
  const server = await handler();

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

module.exports = { start, init };

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});
