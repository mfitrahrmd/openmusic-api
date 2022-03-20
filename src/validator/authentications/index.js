const { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema } = require('./schema');
const validationErrorAction = require('../../exceptions/validationErrorAction');

const postAuthenticationValidator = {
  payload: PostAuthenticationPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const putAuthenticationValidator = {
  payload: PutAuthenticationPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const deleteAuthenticationValidator = {
  payload: DeleteAuthenticationPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postAuthenticationValidator, putAuthenticationValidator, deleteAuthenticationValidator };
