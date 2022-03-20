exports.up = (pgm) => {
  pgm.createTable(
    'users',
    {
      id: {
        type: 'TEXT',
        primaryKey: true,
      },
      username: {
        type: 'VARCHAR(25)',
        notNull: true,
        unique: true,
      },
      password: {
        type: 'TEXT',
        notNull: true,
      },
      fullname: {
        type: 'VARCHAR(50)',
        notNull: true,
      },
    },
    { ifNotExist: true }
  );
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
