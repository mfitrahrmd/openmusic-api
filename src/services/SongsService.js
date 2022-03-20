// Third-Party Modules
const { nanoid } = require('nanoid');
// Local Modules
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const postgrePool = require('../config/PostgrePool');

class SongsService {
  constructor(albumsService) {
    this._pool = postgrePool;
    this._albumsService = albumsService;
  }

  /**
   * Add song data.
   * @param {object} details - Song details.
   * @param {string} details.title - The title of the song.
   * @param {number} details.year - Song release year.
   * @param {string} details.genre - The genre of the song.
   * @param {string} details.performer - The performer of the song.
   * @param {string} details.albumId - The album id of the song's album.
   * @returns {object} The id of created song.
   */
  async addSong({ title, year, genre, performer, duration, albumId }) {
    if (albumId) {
      await this._albumsService.getAlbumById(albumId);
    }

    const id = `song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id AS "songId"',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].songId) {
      throw new InvariantError('Song failed to add');
    }

    return result.rows[0].songId;
  }

  /**
   * Get songs data.
   * @param {object} details - Song details
   * @param {string} detail.title - Song title to be search
   * @param {string} detail.performer - Song performer to be search
   * @returns {object} Object of Array contains songs data.
   */
  async getSongs({ title = '', performer = '' }) {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE title ILIKE $1 AND performer ILIKE $2',
      values: [`%${title}%`, `%${performer}%`],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  /**
   * Search song data for given id.
   * @param {string} id - Song id to be search.
   * @returns {object} Song data.
   */
  async getSongById(id) {
    const query = {
      text: 'SELECT id, title, year, performer, genre, duration, album_id AS "albumId" FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Song not found');
    }

    return result.rows[0];
  }

  /**
   * Update song data for given id.
   * @param {string} id - Song id to be update.
   * @param {object} details - Song details.
   * @param {string} details.title - The title of the song.
   * @param {number} details.year - Song release year.
   * @param {string} details.genre - The genre of the song.
   * @param {string} details.performer - The performer of the song.
   * @param {string} details.albumId - The album id of the song's album.
   * @returns {void}
   */
  async updateSongById(id, { title, year, performer, genre, duration, albumId }) {
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id AS songId',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Song not found');
    }
  }

  /**
   * Delete song data.
   * @param {string} id - Song id to be delete.
   * @returns {void}
   */
  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id AS songId',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Song not found');
    }
  }
}

module.exports = SongsService;
