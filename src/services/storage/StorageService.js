const fs = require('fs');
const path = require('path');

class StorageService {
  constructor(folder) {
    this._folder = folder;

    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }

  writeFile(file, albumId) {
    let { filename } = file.hapi;

    filename = `_picture_${albumId}${path.extname(filename)}`;

    const fileLocation = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(fileLocation);

    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));

      file.pipe(fileStream);

      file.on('end', () => resolve(filename));
    });
  }
}

module.exports = StorageService;
