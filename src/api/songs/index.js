const SongsHandler = require('./handler');
const SongsService = require('../../services/SongsService');
const AlbumsService = require('../../services/AlbumsService');
const routes = require('./routes');

const songsPlugin = {
  plugin: {
    name: 'songs',
    version: '1.0.0',
    register: async (server, { songsService }) => {
      const songsHandler = new SongsHandler(songsService);

      server.route(routes(songsHandler));
    },
  },
  options: {
    songsService: new SongsService(new AlbumsService()),
  },
};

module.exports = songsPlugin;
