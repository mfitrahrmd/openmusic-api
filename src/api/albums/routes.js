const { postAlbumValidator, putAlbumValidator, postAlbumCoverByIdValidator } = require('../../validator/albums');

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
    path: '/albums/{albumId}',
    method: 'GET',
    handler: handler.getAlbumDetailsByIdHandler,
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
  {
    path: '/albums/{id}/covers',
    method: 'POST',
    handler: handler.postAlbumCoverByIdHandler,
    config: {
      validate: postAlbumCoverByIdValidator,
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        output: 'stream',
        maxBytes: 512000,
      },
    },
  },
  {
    path: '/albums/{id}/likes',
    method: 'POST',
    handler: handler.postAlbumLikeByIdHandler,
    config: {
      auth: 'openmusicapp_jwt',
    },
  },
  {
    path: '/albums/{id}/likes',
    method: 'GET',
    handler: handler.getAlbumLikesCountByIdHandler,
  },
];

module.exports = routes;
