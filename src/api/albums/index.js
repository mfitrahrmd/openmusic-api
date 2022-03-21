const AlbumsHandler = require('./handler');
const AlbumsService = require('../../services/AlbumsService');
const routes = require('./routes');

const albumsService = new AlbumsService();

const albumsPlugin = {
  plugin: {
    name: 'albums',
    version: '1.0.0',
    register: async (server) => {
      const albumsHandler = new AlbumsHandler(albumsService);

      server.route(routes(albumsHandler));
    },
  },
};

module.exports = albumsPlugin;
