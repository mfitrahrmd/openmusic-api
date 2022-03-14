const Joi = require('joi');

const postAlbumPayload = Joi.object().keys({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

const putAlbumPayload = Joi.object().keys({
  name: Joi.string().required(),
  year: Joi.number().required(),
});

module.exports = { postAlbumPayload, putAlbumPayload };
