const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const postgrePool = require('../../config/PostgrePool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = postgrePool;
  }

  /**
   * Add user.
   * @param {object} details - User details.
   * @returns {string} the id of created user
   */
  async addUser({ username, password, fullname }) {
    await this.#verifyNewUsername(username);

    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4) RETURNING id AS "userId"',
      values: [id, username, hashedPassword, fullname],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].userId) {
      throw new InvariantError('User failed to add');
    }

    return result.rows[0].userId;
  }

  /**
   * Find user for given id.
   * @param {string} id - the id of the user to be search.
   * @returns {object} the details of the user
   */
  async getUserById(id) {
    const query = {
      text: 'SELECT id, username, fullname FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('User not found');
    }

    return result.rows[0];
  }

  /**
   * Add user.
   * @param {object} details - User details.
   * @returns {string} the id of verified user
   */
  async verifyUserCredential({ username, password }) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new AuthenticationError('Username does not exist');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Invalid Password');
    }

    return id;
  }

  async #verifyNewUsername(username) {
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
