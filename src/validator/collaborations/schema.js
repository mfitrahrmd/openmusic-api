const Joi = require('joi');

const PostCollaborationPayloadSchema = Joi.object().keys({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

const DeleteCollaborationPayloadSchema = Joi.object().keys({
  playlistId: Joi.string().required(),
  userId: Joi.string().required(),
});

module.exports = { PostCollaborationPayloadSchema, DeleteCollaborationPayloadSchema };
