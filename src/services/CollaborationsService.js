const { nanoid } = require('nanoid');
const postgrePool = require('../config/PostgrePool');
const InvariantError = require('../exceptions/InvariantError');
const NotFoundError = require('../exceptions/NotFoundError');

class CollaborationsService {
  constructor(usersService) {
    this._pool = postgrePool;
    this._usersService = usersService;
  }

  async addCollaboration(playlistId, userId) {
    await this._usersService.getUserById(userId);

    const id = `collab-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO collaborations VALUES($1, $2, $3) RETURNING id AS "collaborationId"',
      values: [id, playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].collaborationId) {
      throw new InvariantError('Collaboration failed to add');
    }

    return result.rows[0].collaborationId;
  }

  async deleteCollaboration(playlistId, userId) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Collaboration not found');
    }
  }

  async verifyCollaborator(playlistId, userId) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvariantError('Failed to verify collaboration');
    }
  }
}

module.exports = CollaborationsService;
