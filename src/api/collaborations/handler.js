class CollaborationsHandler {
  constructor(collaborationsService, playlistsService) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request, h) {
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const collaborationId = await this._collaborationsService.addCollaboration(playlistId, userId);

    return h
      .response({
        status: 'success',
        data: {
          collaborationId,
        },
      })
      .code(201);
  }

  async deleteCollaborationHandler(request, h) {
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    await this._collaborationsService.deleteCollaboration(playlistId, userId);

    return h
      .response({
        status: 'success',
        message: 'Collaboration deleted',
      })
      .code(200);
  }
}

module.exports = CollaborationsHandler;
