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
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING song_id AS songId',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    if (!result.rows[0].songid) {
      throw new InvariantError('Song failed to add');
    }

    return result.rows[0];
  }

  async getSongs() {
    const query = {
      text: 'SELECT song_id AS id,title,performer FROM songs',
    };

    const result = await this._pool.query(query).catch((error) => {
      throw error;
    });

    return { songs: result.rows };
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT song_id AS id, title, year, performer, genre, duration, album_id AS albumId FROM songs WHERE song_id = $1',
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
