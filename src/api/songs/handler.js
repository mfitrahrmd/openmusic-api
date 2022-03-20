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
    const songId = await this._service.addSong(request.payload);

    return h
      .response({
        status: 'success',
        data: {
          songId,
        },
      })
      .code(201);
  }

  async getSongsHandler(request, h) {
    const { title, performer } = request.query;
    const songs = await this._service.getSongs({ title, performer });

    return h
      .response({
        status: 'success',
        data: {
          songs,
        },
      })
      .code(200);
  }

  async getSongByIdHandler(request, h) {
    const { id } = request.params;

    const song = await this._service.getSongById(id);

    return h
      .response({
        status: 'success',
        data: {
          song,
        },
      })
      .code(200);
  }

  async putSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.updateSongById(id, request.payload);

    return h
      .response({
        status: 'success',
        message: 'Song updated',
      })
      .code(200);
  }

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;

    await this._service.deleteSongById(id);

    return h
      .response({
        status: 'success',
        message: 'Song deleted',
      })
      .code(200);
  }
}

module.exports = SongsHandler;
