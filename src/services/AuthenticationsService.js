const postgrePool = require('../config/PostgrePool');
const InvariantError = require('../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = postgrePool;
  }

  /**
   * Save refresh token into database.
   * @param {string} token - token to be store.
   * @returns {void}
   */
  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token],
    };

    await this._pool.query(query);
  }

  /**
   * Verify refresh token if its match from database.
   * @param {string} token - token to be verify.
   * @returns {void}
   */
  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Invalid Refresh Token');
    }
  }

  /**
   * Delete refresh token from database.
   * @param {string} token - token to be delete.
   * @returns {void}
   */
  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Invalid Refresh Token');
    }
  }
}

module.exports = AuthenticationsService;
