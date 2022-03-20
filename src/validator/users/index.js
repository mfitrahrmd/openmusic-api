const validationErrorAction = require('../../exceptions/validationErrorAction');
const { PostUserPayloadSchema } = require('./schema');

const postUserValidator = {
  payload: PostUserPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postUserValidator };
