const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service) {
    this._service = service;

    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    try {
      const { title, year, genre, performer, duration, albumId } = request.payload;

      const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

      return h
        .response({
          status: 'success',
          data: songId,
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
      console.error(error.stack);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async getSongsHandler(request, h) {
    try {
      const songs = await this._service.getSongs;

      return h
        .response({
          status: 'success',
          data: songs,
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
      console.error(error.stack);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async getSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      const song = await this._service.getSongById(id);

      return h
        .response({
          status: 'success',
          data: song,
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
      console.error(error.stack);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async putSongByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const { title, year, genre, performer, duration, albumId } = request.payload;

      await this._service.updateSongById(id, { title, year, genre, performer, duration, albumId });

      return h
        .response({
          status: 'success',
          message: 'Song updated',
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
      console.error(error.stack);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }

  async deleteSongByIdHandler(request, h) {
    try {
      const { id } = request.params;

      await this._service.deleteSongById(id);

      return h
        .response({
          status: 'success',
          message: 'Song deleted',
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
      console.error(error.stack);
      return h
        .response({
          status: 'error',
          message: "Sorry, we've encountered an unexpected error. Please try again later.",
        })
        .code(500);
    }
  }
}

module.exports = SongsHandler;
