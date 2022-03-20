const routes = require('./routes');
const CollaborationsHandler = require('./handler');
const CollaborationsService = require('../../services/CollaborationsService');
const PlaylistsService = require('../../services/PlaylistsService');
const UsersService = require('../../services/UsersService');

const collaborationsPlugin = {
  plugin: {
    name: 'collaborations',
    version: '1.0.0',
    register: async (server, { collaborationsService, playlistsService }) => {
      const collaborationsHandler = new CollaborationsHandler(collaborationsService, playlistsService);

      server.route(routes(collaborationsHandler));
    },
  },
  options: {
    collaborationsService: new CollaborationsService(new UsersService()),
    playlistsService: new PlaylistsService(),
  },
};

module.exports = collaborationsPlugin;
