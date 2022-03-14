/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable(
    'albums',
    {
      album_id: {
        type: 'VARCHAR(16)',
        primaryKey: true,
      },
      name: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
      year: {
        type: 'INTEGER',
        notNull: true,
      },
    },
    { ifNotExist: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
