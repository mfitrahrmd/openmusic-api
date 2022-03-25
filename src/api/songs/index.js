const SongsHandler = require('./handler');
const SongsService = require('../../services/postgresql/SongsService');
const AlbumsService = require('../../services/postgresql/AlbumsService');
const routes = require('./routes');

const albumsService = new AlbumsService();
const songsService = new SongsService(albumsService);

const songsPlugin = {
  plugin: {
    name: 'songs',
    version: '1.0.0',
    register: async (server) => {
      const songsHandler = new SongsHandler(songsService);

      server.route(routes(songsHandler));
    },
  },
};

module.exports = songsPlugin;
