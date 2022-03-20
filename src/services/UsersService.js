const { nanoid } = require('nanoid');
const postgrePool = require('../config/PostgrePool');
const InvariantError = require('../exceptions/InvariantError');

class UsersService {
  constructor() {
    this._pool = postgrePool;
  }

  async addUser({ username, password, fullname }) {
    await this.#verifyUsername(username);

    const id = `user-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id AS "userId"',
      values: [id, username, password, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].userId) {
      throw new InvariantError('User failed to add');
    }

    return result.rows[0].userId;
  }

  async #verifyUsername(username) {
    const query = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount) {
      throw new InvariantError('Failed to add user. Username already exist');
    }
  }
}

module.exports = UsersService;
