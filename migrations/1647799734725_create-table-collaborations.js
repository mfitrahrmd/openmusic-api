exports.up = (pgm) => {
  pgm.createTable(
    'collaborations',
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
      user_id: {
        type: 'TEXT',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
    },
    { ifNotExist: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable('collaborations');
};
