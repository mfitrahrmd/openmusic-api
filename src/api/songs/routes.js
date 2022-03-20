const { postSongValidator, putSongValidator } = require('../../validator/songs');

const routes = (handler) => [
  {
    path: '/songs',
    method: 'POST',
    config: {
      validate: postSongValidator,
    },
    handler: handler.postSongHandler,
  },
  {
    path: '/songs',
    method: 'GET',
    handler: handler.getSongsHandler,
  },
  {
    path: '/songs/{id}',
    method: 'GET',
    handler: handler.getSongByIdHandler,
  },
  {
    path: '/songs/{id}',
    method: 'PUT',
    config: {
      validate: putSongValidator,
    },
    handler: handler.putSongByIdHandler,
  },
  {
    path: '/songs/{id}',
    method: 'DELETE',
    handler: handler.deleteSongByIdHandler,
  },
];

module.exports = routes;
