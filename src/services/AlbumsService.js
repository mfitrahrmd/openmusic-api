const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const postgrePool = require('../config/PostgrePool');
const { mapGetAlbumSongsById } = require('../utils/mapDBToModel');

class AlbumsService {
  constructor() {
    this._pool = postgrePool;
  }

  /**
   * Add album data.
   * @param {object} details - Album details.
   * @returns {string} The id of created album.
   */
  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Album failed to add');
    }

    return result.rows[0].id;
  }

  /**
   * Search album data for given id.
   * @param {string} id - Song id to be search.
   * @returns {object} The details of the album.
   */
  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found');
    }

    return result.rows[0];
  }

  /**
   * Search album data for given id.
   * @param {string} id - Song id to be search.
   * @returns {object} The details of the album.
   */
  async getAlbumSongsById(id) {
    const query = {
      text: 'SELECT a.id AS "albumId", a.name, a.year, s.id AS "songId", s.title, s.performer FROM albums a LEFT JOIN songs s ON a.id = s.album_id WHERE a.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found');
    }

    return mapGetAlbumSongsById(result.rows);
  }

  /**
   * Update album data for given id.
   * @param {string} id - Song id to be update.
   * @param {object} details - Song details
   * @returns {void}
   */
  async updateAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found');
    }
  }

  /**
   * Update album data for given id.
   * @param {string} id - Song id to be delete.
   * @returns {void}
   */
  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found');
    }
  }
}

module.exports = AlbumsService;
