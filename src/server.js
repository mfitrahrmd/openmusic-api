// Core Modules
const path = require('path');
// Third-Party Modules
const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const CatboxRedis = require('@hapi/catbox-redis');
require('dotenv').config();

// Server Plugin
const albumsPlugin = require('./api/albums');
const songsPlugin = require('./api/songs');
const usersPlugin = require('./api/users');
const authenticationsPlugin = require('./api/authentications');
const playlistsPlugin = require('./api/playlists');
const collaborationsPlugin = require('./api/collaborations');
const exportsPlugin = require('./api/exports');

const errorHandler = require('./serverExtensions/errorHandler');

if (!process.env.HOST || !process.env.PORT) {
  throw new Error('Enivorment host & port is required');
}

const init = async () => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
    cache: [
      {
        name: 'redis_cache',
        provider: {
          constructor: CatboxRedis,
          options: {
            host: process.env.REDIS_SERVER || 'localhost',
            port: process.env.REDIS_PORT || 6379,
            database: process.env.REDIS_DATABASE || 0,
          },
        },
      },
    ],
  });

  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  server.auth.strategy('openmusicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE || 1800,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.userId,
      },
    }),
  });

  // Route for serving static resources
  server.route({
    path: '/static/{param*}',
    method: 'GET',
    handler: {
      directory: {
        path: path.resolve(process.cwd(), 'src/static'),
      },
    },
  });

  await server.register([albumsPlugin, songsPlugin, usersPlugin, authenticationsPlugin, playlistsPlugin, collaborationsPlugin, exportsPlugin]);

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
