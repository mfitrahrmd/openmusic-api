// Third-Part Modules
const { nanoid } = require('nanoid');
// Local Modules
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const postgrePool = require('../config/PostgrePool');

class AlbumsService {
  constructor() {
    this._pool = postgrePool;
  }

  /**
   * Add album data.
   * @param {object} details - Song details.
   * @param {string} details.name - The name of the album.
   * @param {number} details.year - Album release year.
   * @returns {object} The id of created album.
   */
  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING album_id AS "albumId"',
      values: [id, name, year],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows[0].albumId) {
      throw new InvariantError('Album failed to add');
    }

    return result.rows[0];
  }

  /**
   * Search album data for given id.
   * @param {string} id - Song id to be search.
   * @returns {object} The details of the album.
   */
  async getAlbumById(id) {
    const query = {
      text: 'SELECT album_id AS id, name, year FROM albums WHERE album_id = $1',
      values: [id],
    };

    const query2 = {
      text: 'SELECT song_id AS id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };

    const result = await Promise.all([this._pool.query(query), this._pool.query(query2)])
      .then(([q, q2]) => {
        q.rows[0].songs = q2.rows;
        return q;
      })
      .catch(() => {
        throw new NotFoundError('Album not found');
      });

    if (!result.rows.length) {
      throw new NotFoundError('Album not found');
    }

    return { album: result.rows[0] };
  }

  /**
   * Update album data for given id.
   * @param {string} id - Song id to be update.
   * @param {object} details - Song details
   * @param {string} details.name - The name of the album.
   * @param {number} details.year - Album release year.
   * @returns {void}
   */
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

  /**
   * Update album data for given id.
   * @param {string} id - Song id to be delete.
   * @returns {void}
   */
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
