exports.up = (pgm) => {
  pgm.createType('action', ['add', 'delete']);

  pgm.createTable(
    'playlist_songs_activities',
    {
      id: {
        type: 'TEXT',
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
      },
      user_id: {
        type: 'TEXT',
        notNull: true,
      },
      action: {
        type: 'action',
        notNull: true,
      },
      time: {
        type: 'TIMESTAMP',
        notNull: true,
      },
    },
    { ifNotExist: true }
  );
};

exports.down = (pgm) => {
  pgm.dropType('ACTION');

  pgm.dropTable('playlist_songs_activities');
};
