class AlbumsHandler {
  constructor(albumsService) {
    this._albumsService = albumsService;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumSongsByIdHandler = this.getAlbumSongsByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    const albumId = await this._albumsService.addAlbum(request.payload);

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

    const album = await this._albumsService.getAlbumSongsById(id);

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

    await this._albumsService.updateAlbumById(id, { name, year });

    return h
      .response({
        status: 'success',
        message: 'Album updated',
      })
      .code(200);
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;

    await this._albumsService.deleteAlbumById(id);

    return h
      .response({
        status: 'success',
        message: 'Album deleted',
      })
      .code(200);
  }
}

module.exports = AlbumsHandler;
