const validationErrorAction = require('../../exceptions/validationErrorAction');
const { PostAlbumPayloadSchema, PutAlbumPayloadSchema } = require('./schema');

const postAlbumValidator = {
  payload: PostAlbumPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const putAlbumValidator = {
  payload: PutAlbumPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postAlbumValidator, putAlbumValidator };
