const { postAlbumPayload, putAlbumPayload } = require('./validate');
const validationErrorAction = require('../../exceptions/validationErrorAction');

const routes = (handler) => [
  {
    path: '/albums',
    method: 'POST',
    config: {
      validate: {
        payload: postAlbumPayload,
        options: {
          abortEarly: false,
        },
        failAction: validationErrorAction,
      },
    },
    handler: handler.postAlbumHandler,
  },
  {
    path: '/albums/{id}',
    method: 'GET',
    handler: handler.getAlbumByIdHandler,
  },
  {
    path: '/albums/{id}',
    method: 'PUT',
    config: {
      validate: {
        payload: putAlbumPayload,
        options: {
          abortEarly: false,
        },
        failAction: validationErrorAction,
      },
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
