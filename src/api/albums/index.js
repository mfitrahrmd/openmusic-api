const AlbumsHandler = require('./handler');
const AlbumsService = require('../../services/AlbumsService');
const routes = require('./routes');

const albumsPlugin = {
  plugin: {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { service }) => {
      const albumsHandler = new AlbumsHandler(service);

      server.route(routes(albumsHandler));
    },
  },
  options: {
    service: new AlbumsService(),
  },
};

module.exports = albumsPlugin;
