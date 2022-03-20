const { PostCollaborationPayloadSchema, DeleteCollaborationPayloadSchema } = require('./schema');
const validationErrorAction = require('../../exceptions/validationErrorAction');

const postCollaborationValidator = {
  payload: PostCollaborationPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

const deleteCollaborationValidator = {
  payload: DeleteCollaborationPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction: validationErrorAction,
};

module.exports = { postCollaborationValidator, deleteCollaborationValidator };
