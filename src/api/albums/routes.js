const { postAlbumValidator, putAlbumValidator } = require('../../validator/albums');

const routes = (handler) => [
  {
    path: '/albums',
    method: 'POST',
    config: {
      validate: postAlbumValidator,
    },
    handler: handler.postAlbumHandler,
  },
  {
    path: '/albums/{id}',
    method: 'GET',
    handler: handler.getAlbumSongsByIdHandler,
  },
  {
    path: '/albums/{id}',
    method: 'PUT',
    config: {
      validate: putAlbumValidator,
    },
    handler: handler.putAlbumByIdHandler,
  },
  {
    path: '/albums/{id}',
    method: 'DELETE',
    handler: handler.deleteAlbumByIdHandler,
  },
];

module.exports = routes;
