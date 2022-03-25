exports.up = (pgm) => {
  pgm.createTable(
    'user_album_likes',
    {
      id: {
        type: 'SERIAL',
        primaryKey: true,
      },
      user_id: {
        type: 'TEXT',
        notNull: true,
        references: '"users"',
        onDelete: 'CASCADE',
      },
      album_id: {
        type: 'TEXT',
        notNull: true,
        references: '"albums"',
        onDelete: 'CASCADE',
      },
    },
    { ifNotExist: true }
  );

  pgm.addConstraint('user_album_likes', 'user liked album', {
    unique: ['user_id', 'album_id'],
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
