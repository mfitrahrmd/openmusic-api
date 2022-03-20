const validationErrorAction = require('../../exceptions/validationErrorAction');
const { PostSongPayloadSchema, PutSongPayloadSchema } = require('./schema');

const postSongValidator = {
  payload: PostSongPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const putSongValidator = {
  payload: PutSongPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postSongValidator, putSongValidator };
