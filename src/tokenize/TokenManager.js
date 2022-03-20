const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');
require('dotenv');

const TokenManager = {
  generateAccessToken(payload) {
    return Jwt.token.generate(payload, process.env.JWT_ACCESS_TOKEN_KEY);
  },

  generateRefreshToken(payload) {
    return Jwt.token.generate(payload, process.env.JWT_REFRESH_TOKEN_KEY);
  },

  verifyRefreshToken(refreshToken) {
    try {
      const artifacts = Jwt.token.decode(refreshToken);

      Jwt.token.verifySignature(artifacts, process.env.JWT_REFRESH_TOKEN_KEY);

      const { payload } = artifacts.decoded;

      return payload;
    } catch (error) {
      throw new InvariantError('Invalid Refresh Token');
    }
  },
};

module.exports = TokenManager;
