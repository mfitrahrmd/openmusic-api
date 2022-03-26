const path = require('path');
const AlbumsHandler = require('./handler');
const AlbumsService = require('../../services/postgresql/AlbumsService');
const StorageService = require('../../services/storage/StorageService');

const { validateImageHeaders } = require('../../validator/uploads/index');

const routes = require('./routes');

const FOLDER_LOCATION = path.resolve(process.cwd(), 'src/static/uploads/images');

const albumsService = new AlbumsService();
const storageService = new StorageService(FOLDER_LOCATION);

const albumsPlugin = {
  plugin: {
    name: 'albums',
    version: '1.0.0',
    register: async (server) => {
      // Whenever this method is called the result will be saved to cache (redis)
      server.method('cached_getAlbumLikesCount', albumsService.getAlbumLikesCount, {
        cache: {
          cache: 'redis_cache',
          expiresIn: 1000 * 60 * 30, // 30 minute
          generateTimeout: 3000,
          getDecoratedValue: true, // Get additional details about the cache state (value, cached, report)
        },
      });

      const albumsHandler = new AlbumsHandler(albumsService, storageService, validateImageHeaders);

      server.route(routes(albumsHandler));
    },
  },
};

module.exports = albumsPlugin;
