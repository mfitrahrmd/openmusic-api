const { PostPlaylistPayloadSchema, PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema } = require('./schema');
const validationErrorAction = require('../../exceptions/validationErrorAction');

const postPlaylistValidator = {
  payload: PostPlaylistPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const postPlaylistSongValidator = {
  payload: PostPlaylistSongPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const deletePlaylistSongValidator = {
  payload: DeletePlaylistSongPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postPlaylistValidator, postPlaylistSongValidator, deletePlaylistSongValidator };
