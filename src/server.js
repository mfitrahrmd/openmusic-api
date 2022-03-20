// Third-Party Modules
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
require('dotenv').config();
// Local Modules
const albumsPlugin = require('./api/albums');
const songsPlugin = require('./api/songs');
const usersPlugin = require('./api/users');
const authenticationsPlugin = require('./api/authentications');
const errorHandler = require('./serverExtensions/errorHandler');

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

const init = async () => {
  const server = Hapi.server({
    host: HOST,
    port: PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt,
    },
  ]);

  server.auth.strategy('openmusicapp_jwt', 'jwt', {
    keys: process.env.JWT_ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.JWT_ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => {
      console.log(artifacts);
      return {
        isValid: true,
        credentials: {
          id: artifacts.decoded.payload.id,
        },
      };
    },
  });

  await server.register(albumsPlugin);
  await server.register(songsPlugin);
  await server.register(usersPlugin);
  await server.register(authenticationsPlugin);

  server.ext({
    type: 'onPreResponse',
    method: errorHandler,
  });

  try {
    await server.start();
    console.log(`Server running on http://${HOST}:${PORT}/`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

init();
