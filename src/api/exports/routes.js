const { exportPlaylistByIdValidator } = require('../../validator/exports');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/export/playlists/{playlistId}',
    handler: handler.postExportPlaylistByIdHandler,
    options: {
      auth: 'openmusicapp_jwt',
      validate: exportPlaylistByIdValidator,
    },
  },
];

module.exports = routes;
