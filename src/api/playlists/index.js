const PlaylistsHandler = require('./handler');
const PlaylistsService = require('../../services/postgresql/PlaylistsService');
const SongsService = require('../../services/postgresql/SongsService');
const CollaborationsService = require('../../services/postgresql/CollaborationsService');
const routes = require('./routes');

const songsService = new SongsService();
const collaborationsService = new CollaborationsService();
const playlistsService = new PlaylistsService(songsService, collaborationsService);

const playlistsPlugin = {
  plugin: {
    name: 'playlists',
    version: '1.0.0',
    register: async (server) => {
      const playlistsHandler = new PlaylistsHandler(playlistsService);

      server.route(routes(playlistsHandler));
    },
  },
};

module.exports = playlistsPlugin;
