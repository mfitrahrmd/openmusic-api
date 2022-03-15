// Third-Party Modules
const { nanoid } = require('nanoid');
// Local Modules
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const postgrePool = require('../config/PostgrePool');

class SongsService {
  constructor() {
    this._pool = postgrePool;
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
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING song_id AS "songId"',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query).catch(() => {
      throw new NotFoundError(`Album with id ${albumId} was not found`);
    });

    if (!result.rows[0].songId) {
      throw new InvariantError('Song failed to add');
    }

    return result.rows[0];
  }

  /**
   * Get songs data.
   * @returns {object} Object of Array contains songs data.
   */
  async getSongs() {
    const query = {
      text: 'SELECT song_id AS id, title, performer FROM songs',
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    return { songs: result.rows };
  }

  /**
   * Search song data for given id.
   * @param {string} id - Song id to be search.
   * @returns {object} Song data.
   */
  async getSongById(id) {
    const query = {
      text: 'SELECT song_id AS "id", title, year, performer, genre, duration, album_id AS "albumId" FROM songs WHERE song_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Song not found');
    }

    return { song: result.rows[0] };
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
      text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE song_id = $7 RETURNING song_id AS songId',
      values: [title, year, performer, genre, duration, albumId, id],
    };

    const result = await this._pool.query(query).catch(() => {
      throw new NotFoundError(`Album with id ${albumId} was not found`);
    });

    if (!result.rows.length) {
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
      text: 'DELETE FROM songs WHERE song_id = $1 RETURNING song_id AS songId',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Song not found');
    }
  }
}

module.exports = SongsService;
