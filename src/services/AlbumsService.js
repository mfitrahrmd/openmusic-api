const { nanoid } = require('nanoid');
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

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows[0].album_id) {
      throw new InvariantError('Album failed to add');
    }

    return result.rows.map(({ album_id }) => ({
      id: album_id,
    }))[0];
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE album_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }

    return {
      album: result.rows.map(({ album_id, ...rest }) => ({
        id: album_id,
        ...rest,
      }))[0],
    };
  }

  async updateAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE album_id = $3 RETURNING album_id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE album_id = $1 RETURNING album_id',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }
  }
}

module.exports = AlbumsService;
