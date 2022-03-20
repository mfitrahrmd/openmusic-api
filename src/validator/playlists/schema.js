const Joi = require('joi');

const PostPlaylistPayloadSchema = Joi.object().keys({
  name: Joi.string().max(50).required(),
});

const PostPlaylistSongPayloadSchema = Joi.object().keys({
  songId: Joi.string().required(),
});

const DeletePlaylistSongPayloadSchema = Joi.object().keys({
  songId: Joi.string().required(),
});

module.exports = { PostPlaylistPayloadSchema, PostPlaylistSongPayloadSchema, DeletePlaylistSongPayloadSchema };
