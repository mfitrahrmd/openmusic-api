const { nanoid } = require('nanoid');
const { camelCase } = require('lodash');
const InvariantError = require('../exceptions/InvariantError');
const postgrePool = require('../config/PostgrePool');

class AlbumsService {
  constructor() {
    this._pool = postgrePool;
  }

  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING album_id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].album_id) {
      throw new InvariantError('Album failed to add');
    }

    return camelCase(result.rows[0].album_id);
  }
}

module.exports = AlbumsService;
