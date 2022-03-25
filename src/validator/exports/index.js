const { ExportPlaylistByIdPayloadSchema } = require('./schema');
const InvariantError = require('../../exceptions/InvariantError');

const exportPlaylistByIdValidator = {
  payload: ExportPlaylistByIdPayloadSchema,
  options: {
    abortEarly: false,
  },
  failAction(request, h, err) {
    if (err.isJoi) {
      throw new InvariantError(err.message);
    }
    return h.continue;
  },
};

module.exports = { exportPlaylistByIdValidator };
