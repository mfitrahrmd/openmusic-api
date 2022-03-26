const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const postgrePool = require('./PostgrePool');
const { mapGetAlbumDetailsById } = require('../../utils/mapDBToModel');

class AlbumsService {
  constructor() {
    this._pool = postgrePool;

    this.getAlbumLikesCount = this.getAlbumLikesCount.bind(this);
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
      text: 'SELECT id, name, cover_url AS "coverUrl" FROM albums WHERE id = $1',
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
  async getAlbumDetailsById(id) {
    const query = {
      text: 'SELECT a.id AS "albumId", a.name, a.year, a.cover_url AS "coverUrl", s.id AS "songId", s.title, s.performer FROM albums a LEFT JOIN songs s ON a.id = s.album_id WHERE a.id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found');
    }

    return mapGetAlbumDetailsById(result.rows);
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

  /**
   * Add/replace album cover.
   * @param {string} id - Album id.
   * @returns {void}
   */
  async addAlbumCoverById(id, coverUrl) {
    const query = {
      text: 'UPDATE albums SET cover_url = $1 WHERE id = $2',
      values: [coverUrl, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to add album cover');
    }
  }

  /**
   * Check like status
   * @param {string} albumId
   * @param {string} userId
   * @returns {boolean} like status
   */
  async albumIsLiked(albumId, userId) {
    const query = {
      text: 'SELECT * FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) return false;

    return true;
  }

  /**
   * Like/dislike album
   * @param {string} albumId - Album id.
   * @param {string} userId - Like the album using given user id.
   * @returns {string} message
   */
  async AlbumLike(albumId, userId) {
    await this.getAlbumById(albumId);

    const liked = await this.albumIsLiked(albumId, userId);

    if (liked) {
      await this._pool.query({
        text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
        values: [userId, albumId],
      });
      return 'Album disliked';
    }
    await this._pool.query({
      text: 'INSERT INTO user_album_likes(user_id, album_id) VALUES($1, $2) RETURNING id',
      values: [userId, albumId],
    });
    return 'Album liked';
  }

  /**
   * Get total likes of selected album
   * @param {string} albumId - Album id.
   * @returns {number} The total likes album
   */
  async getAlbumLikesCount(albumId) {
    await this.getAlbumById(albumId);

    const query = {
      text: 'SELECT COUNT(user_id) AS "likes" FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);

    return parseInt(result.rows[0].likes, 10);
  }
}

module.exports = AlbumsService;
