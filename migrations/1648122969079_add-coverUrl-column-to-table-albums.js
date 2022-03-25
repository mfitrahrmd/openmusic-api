exports.up = (pgm) => {
  pgm.addColumns('albums', {
    cover_url: {
      type: 'TEXT',
      default: null,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('albums', 'cover_url');
};
