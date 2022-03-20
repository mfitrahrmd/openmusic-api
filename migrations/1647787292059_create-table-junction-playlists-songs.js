exports.up = (pgm) => {
  pgm.createTable(
    'playlists_songs',
    {
      id: {
        type: 'SERIAL',
        primaryKey: true,
      },
      playlist_id: {
        type: 'TEXT',
        notNull: true,
        references: '"playlists"',
        onDelete: 'CASCADE',
      },
      song_id: {
        type: 'TEXT',
        notNull: true,
        references: '"songs"',
        onDelete: 'CASCADE',
      },
    },
    { ifNotExist: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlists_songs');
};
