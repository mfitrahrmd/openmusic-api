class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumSongsByIdHandler = this.getAlbumSongsByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    const albumId = await this._service.addAlbum(request.payload);

    return h
      .response({
        status: 'success',
        data: {
          albumId,
        },
      })
      .code(201);
  }

  async getAlbumSongsByIdHandler(request, h) {
    const { id } = request.params;

    const album = await this._service.getAlbumSongsById(id);

    return h
      .response({
        status: 'success',
        data: {
          album,
        },
      })
      .code(200);
  }

  async putAlbumByIdHandler(request, h) {
    const { id } = request.params;
    const { name, year } = request.payload;

    await this._service.updateAlbumById(id, { name, year });

    return h
      .response({
        status: 'success',
        message: 'Album updated',
      })
      .code(200);
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteAlbumById(id);

    return h
      .response({
        status: 'success',
        message: 'Album deleted',
      })
      .code(200);
  }
}

module.exports = AlbumsHandler;
