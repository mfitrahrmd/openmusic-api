const routes = require('./routes');
const ExportsHandler = require('./handler');
const ProducerService = require('../../services/rabbitmq/producer/ProducerService');
const PlaylistsService = require('../../services/postgresql/PlaylistsService');

const playlistsService = new PlaylistsService();

const exportsPlugin = {
  plugin: {
    name: 'exports',
    version: '1.0.0',
    register: async (server) => {
      const exportsHandler = new ExportsHandler(ProducerService, playlistsService);

      server.route(routes(exportsHandler));
    },
  },
};

module.exports = exportsPlugin;
