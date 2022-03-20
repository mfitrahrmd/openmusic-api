const { nanoid } = require('nanoid');
const postgrePool = require('../config/PostgrePool');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');
const { mapGetSongsFromPlaylistById } = require('../utils/mapDBToModel');

class PlaylistsService {
  constructor(songsService) {
    this._pool = postgrePool;
    this._songsService = songsService;
  }

  async addPlaylist({ name, credentialId: owner }) {
    const id = `playlist-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id AS "playlistId"',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].playlistId) {
      throw new InvariantError('Playlist failed to add');
    }

    return result.rows[0].playlistId;
  }

  async getPlaylists(owner) {
    const query = {
      text: 'SELECT p.id, p.name, u.username FROM users u LEFT JOIN playlists p ON u.id = p.owner WHERE p.owner = $1',
      values: [owner],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id AS "playlistId"',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist not found');
    }
  }

  async addSongToPlaylistById(playlistId, songId) {
    await this._songsService.getSongById(songId);

    const query = {
      text: 'INSERT INTO playlists_songs(playlist_id, song_id) VALUES($1, $2) RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add song into playlist');
    }
  }

  async getSongsFromPlaylistById(id) {
    const query = {
      text: 'SELECT p.id AS "playlistId", p.name, u.username, s.id AS "songId", s.title, s.performer FROM users u LEFT JOIN playlists p ON u.id = p.ownera LEFT JOIN playlists_songs ps ON ps.playlist_id = p.id LEFT JOIN songs s ON ps.song_id = s.id WHERE p.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Playlist not found');
    }

    return mapGetSongsFromPlaylistById(result.rows);
  }

  async deleteSongFromPlaylistById(id, songId) {
    const query = {
      text: 'DELETE FROM playlists_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [id, songId],
    };

    const result = await this._pool.query(query).catch((err) => {
      console.log(err);
    });

    console.log(result);

    if (!result.rowCount) {
      throw new NotFoundError('Song not found');
    }
  }
}

module.exports = PlaylistsService;
