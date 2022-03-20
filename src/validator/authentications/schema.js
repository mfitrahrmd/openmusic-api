const Joi = require('joi');

const PostAuthenticationPayloadSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutAuthenticationPayloadSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
});
const DeleteAuthenticationPayloadSchema = Joi.object().keys({
  refreshToken: Joi.string().required(),
});

module.exports = { PostAuthenticationPayloadSchema, PutAuthenticationPayloadSchema, DeleteAuthenticationPayloadSchema };
