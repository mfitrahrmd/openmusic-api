const Joi = require('joi');

const PostAlbumPayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const PutAlbumPayloadSchema = Joi.object().keys({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = { PostAlbumPayloadSchema, PutAlbumPayloadSchema };
