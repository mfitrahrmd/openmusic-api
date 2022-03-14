const SongsHandler = require('./handler');
const SongsService = require('../../services/SongsService');
const routes = require('./routes');

const songsPlugin = {
  plugin: {
    name: 'songs',
    version: '1.0.0',
    register: async (server, { service }) => {
      const songsHandler = new SongsHandler(service);

      server.route(routes(songsHandler));
    },
  },
  options: {
    service: new SongsService(),
  },
};

module.exports = songsPlugin;
