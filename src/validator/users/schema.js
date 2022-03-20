const Joi = require('joi');

const PostUserPayloadSchema = Joi.object().keys({
  username: Joi.string().max(25).required(),
  password: Joi.string().required(),
  fullname: Joi.string().max(50).required(),
});

module.exports = { PostUserPayloadSchema };
