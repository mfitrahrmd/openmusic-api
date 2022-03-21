class PlaylistsHandler {
  constructor(playlistsService) {
    this._playlistsService = playlistsService;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postSongToPlaylistByIdHandler = this.postSongToPlaylistByIdHandler.bind(this);
    this.getSongsFromPlaylistByIdHandler = this.getSongsFromPlaylistByIdHandler.bind(this);
    this.deleteSongFromPlaylistByIdHandler = this.deleteSongFromPlaylistByIdHandler.bind(this);
    this.getPlaylistActivitiesByIdHandler = this.getPlaylistActivitiesByIdHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._playlistsService.addPlaylist({ ...request.payload, credentialId });

    return h
      .response({
        status: 'success',
        data: {
          playlistId,
        },
      })
      .code(201);
  }

  async getPlaylistsHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;

    const playlists = await this._playlistsService.getPlaylists(credentialId);

    return h
      .response({
        status: 'success',
        data: {
          playlists,
        },
      })
      .code(200);
  }

  async deletePlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(id, credentialId);

    await this._playlistsService.deletePlaylistById(id);

    return h
      .response({
        status: 'success',
        message: 'Playlist deleted',
      })
      .code(200);
  }

  async postSongToPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    await this._playlistsService.addSongToPlaylistById(id, songId);

    await this._playlistsService.addPlaylistActivities(id, songId, credentialId, 'add');

    return h
      .response({
        status: 'success',
        message: 'Song added to playlist',
      })
      .code(201);
  }

  async getSongsFromPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    const playlist = await this._playlistsService.getSongsFromPlaylistById(id);

    return h
      .response({
        status: 'success',
        data: {
          playlist,
        },
      })
      .code(200);
  }

  async deleteSongFromPlaylistByIdHandler(request, h) {
    const { id } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    await this._playlistsService.deleteSongFromPlaylistById(id, songId);

    await this._playlistsService.addPlaylistActivities(id, songId, credentialId, 'delete');

    return h
      .response({
        status: 'success',
        message: 'Song removed from playlist',
      })
      .code(200);
  }

  async getPlaylistActivitiesByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(id, credentialId);

    const playlistActivities = await this._playlistsService.getPlaylistActivitiesById(id);

    return h
      .response({
        status: 'success',
        data: playlistActivities,
      })
      .code(200);
  }
}

module.exports = PlaylistsHandler;
