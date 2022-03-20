exports.up = (pgm) => {
  pgm.createTable(
    'playlists',
    {
      id: {
        type: 'TEXT',
        primaryKey: true,
      },
      name: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      owner: {
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
  pgm.dropTable('playlists');
};
