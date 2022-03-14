const { nanoid } = require('nanoid');
const { mapKeys, camelCase } = require('lodash');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
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

    return result.rows.map((row) => mapKeys(row, (value, key) => camelCase(key)))[0];
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE album_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }

    return result.rows.map((row) => mapKeys(row, (value, key) => camelCase(key)))[0];
  }
}

module.exports = AlbumsService;
