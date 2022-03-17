exports.up = (pgm) => {
  pgm.createTable(
    'songs',
    {
      song_id: {
        type: 'VARCHAR(16)',
        primaryKey: true,
      },
      title: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      year: {
        type: 'SMALLINT',
        notNull: true,
      },
      genre: {
        type: 'VARCHAR(25)',
        notNull: true,
      },
      performer: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      duration: {
        type: 'SMALLINT',
      },
      album_id: {
        type: 'VARCHAR(16)',
        references: '"albums"',
        onDelete: 'cascade',
        onUpdate: 'cascade',
      },
    },
    { ifNotExists: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
};
