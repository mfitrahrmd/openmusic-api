const ClientError = require('../../exceptions/ClientError');

class AlbumsHandler {
  constructor(service) {
    this._service = service;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    try {
      const { name, year } = request.payload;

      const albumId = await this._service.addAlbum({ name, year });

      return h
        .response({
          status: 'success',
          data: albumId,
        })
        .code(201);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async getAlbumByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const album = await this._service.getAlbumById(id);

      return h
        .response({
          status: 'success',
          data: album,
        })
        .code(200);
    } catch (error) {
      if (error instanceof ClientError) {
        return h
          .response({
            status: 'fail',
            message: error.message,
          })
          .code(error.statusCode);
      }

      // Server ERROR
      console.error(error);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async putAlbumByIdHandler(request, h) {}

  async deleteAlbumByIdHandler(request, h) {}
}

module.exports = AlbumsHandler;
