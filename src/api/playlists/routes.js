const { postPlaylistValidator, postPlaylistSongValidator, deletePlaylistSongValidator } = require('../../validator/playlists');

const routes = (handler) => [
  {
    path: '/playlists',
    method: 'POST',
    config: {
      auth: 'openmusicapp_jwt',
      validate: postPlaylistValidator,
    },
    handler: handler.postPlaylistHandler,
  },
  {
    path: '/playlists',
    method: 'GET',
    config: {
      auth: 'openmusicapp_jwt',
    },
    handler: handler.getPlaylistsHandler,
  },
  {
    path: '/playlists/{id}',
    method: 'DELETE',
    config: {
      auth: 'openmusicapp_jwt',
    },
    handler: handler.deletePlaylistByIdHandler,
  },
  {
    path: '/playlists/{id}/songs',
    method: 'POST',
    config: {
      auth: 'openmusicapp_jwt',
      validate: postPlaylistSongValidator,
    },
    handler: handler.postSongToPlaylistByIdHandler,
  },
  {
    path: '/playlists/{id}/songs',
    method: 'GET',
    config: {
      auth: 'openmusicapp_jwt',
    },
    handler: handler.getSongsFromPlaylistByIdHandler,
  },
  {
    path: '/playlists/{id}/songs',
    method: 'DELETE',
    config: {
      auth: 'openmusicapp_jwt',
      validate: deletePlaylistSongValidator,
    },
    handler: handler.deleteSongFromPlaylistByIdHandler,
  },
  {
    path: '/playlists/{id}/activities',
    method: 'GET',
    config: {
      auth: 'openmusicapp_jwt',
    },
    handler: handler.getPlaylistActivitiesByIdHandler,
  },
];

module.exports = routes;
