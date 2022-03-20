exports.up = (pgm) => {
  pgm.renameColumn('albums', 'album_id', 'id');

  pgm.alterColumn('albums', 'id', {
    type: 'TEXT',
  });

  pgm.renameColumn('songs', 'song_id', 'id');

  pgm.alterColumn('songs', 'id', {
    type: 'TEXT',
  });

  pgm.alterColumn('songs', 'album_id', {
    type: 'TEXT',
  });
};

exports.down = (pgm) => {
  pgm.renameColumn('albums', 'id', 'album_id');

  pgm.alterColumn('albums', 'album_id', {
    type: 'VARCHAR(16)',
  });

  pgm.renameColumn('songs', 'id', 'song_id');

  pgm.alterColumn('songs', 'song_id', {
    type: 'VARCHAR(16)',
  });

  pgm.alterColumn('songs', 'album_id', {
    type: 'VARCHAR(16)',
  });
};
