const PlaylistsHandler = require('./handler');
const PlaylistsService = require('../../services/PlaylistsService');
const SongsService = require('../../services/SongsService');
const CollaborationsService = require('../../services/CollaborationsService');
const routes = require('./routes');

const playlistsPlugin = {
  plugin: {
    name: 'playlists',
    version: '1.0.0',
    register: async (server, { playlistsService }) => {
      const playlistsHandler = new PlaylistsHandler(playlistsService);

      server.route(routes(playlistsHandler));
    },
  },
  options: {
    playlistsService: new PlaylistsService(new SongsService(), new CollaborationsService()),
  },
};

module.exports = playlistsPlugin;
