class AlbumsHandler {
  constructor(albumsService, storageService, validateImageHeaders) {
    this._albumsService = albumsService;
    this._storageService = storageService;
    this._validateImageHeaders = validateImageHeaders;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumDetailsByIdHandler = this.getAlbumDetailsByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postAlbumCoverByIdHandler = this.postAlbumCoverByIdHandler.bind(this);
    this.postAlbumLikeByIdHandler = this.postAlbumLikeByIdHandler.bind(this);
    this.getAlbumLikesCountByIdHandler = this.getAlbumLikesCountByIdHandler.bind(this);
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

  async getAlbumDetailsByIdHandler(request, h) {
    const { albumId } = request.params;

    const album = await this._albumsService.getAlbumDetailsById(albumId);

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

  async postAlbumCoverByIdHandler(request, h) {
    const { id } = request.params;
    const { cover } = request.payload;

    await this._albumsService.getAlbumById(id);

    this._validateImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, id);

    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/static/uploads/images/${filename}`;

    await this._albumsService.addAlbumCoverById(id, fileLocation);

    return h
      .response({
        status: 'success',
        message: 'Sampul berhasil diunggah',
      })
      .code(201);
  }

  async postAlbumLikeByIdHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    const { cached_getAlbumLikesCount } = request.server.methods;

    const message = await this._albumsService.AlbumLike(id, credentialId);

    // Delete cache for requested album
    await cached_getAlbumLikesCount.cache.drop(id);

    return h
      .response({
        status: 'success',
        message,
      })
      .code(201);
  }

  async getAlbumLikesCountByIdHandler(request, h) {
    const { id } = request.params;
    const { cached_getAlbumLikesCount } = request.server.methods;

    // Try to get data from cache (redis) if it is not found then get fresh data from database
    const likes = await cached_getAlbumLikesCount(id);

    const response = h
      .response({
        status: 'success',
        data: {
          likes: likes.value,
        },
      })
      .code(200);

    if (likes.cached) {
      return response.header('X-Data-Source', 'cache');
    }
    return response;
  }
}

module.exports = AlbumsHandler;
