const AlbumsHandler = require('./handler');
const AlbumsService = require('../../services/AlbumsService');
const routes = require('./routes');

const albumsPlugin = {
  plugin: {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { albumsService }) => {
      const albumsHandler = new AlbumsHandler(albumsService);

      server.route(routes(albumsHandler));
    },
  },
  options: {
    albumsService: new AlbumsService(),
  },
};

module.exports = albumsPlugin;
