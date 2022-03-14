const { nanoid } = require('nanoid');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const postgrePool = require('../config/PostgrePool');

class SongsService {
  constructor() {
    this._pool = postgrePool;
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO Songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING song_id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows[0].song_id) {
      throw new InvariantError('Song failed to add');
    }

    return result.rows.map(({ song_id }) => ({
      id: song_id,
    }))[0];
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM Songs WHERE Song_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Song not found');
    }

    return {
      Song: result.rows.map(({ Song_id, ...rest }) => ({
        id: Song_id,
        ...rest,
      }))[0],
    };
  }

  async updateSongById(id, { name, year }) {
    const query = {
      text: 'UPDATE Songs SET name = $1, year = $2 WHERE Song_id = $3 RETURNING Song_id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows.length) {
      throw new NotFoundError('Song not found');
    }
  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM Songs WHERE Song_id = $1 RETURNING Song_id',
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
