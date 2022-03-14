const { postSongPayload, putSongPayload } = require('./validate');
const validationErrorAction = require('../../exceptions/validationErrorAction');

const routes = (handler) => [
  {
    path: '/songs',
    method: 'POST',
    config: {
      validate: {
        payload: postSongPayload,
        options: {
          abortEarly: false,
        },
        failAction: validationErrorAction,
      },
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
      validate: {
        payload: putSongPayload,
        options: {
          abortEarly: false,
        },
        failAction: validationErrorAction,
      },
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
