exports.up = pgm => {
  pgm.createTable('product_image', {
    id: 'id',
    product_id: { type: 'integer', notNull: true, references: '"products"', onDelete: 'cascade' },
    url: { type: 'varchar(150)', notNull: true },
  });
};

exports.down = pgm => {
  pgm.dropTable('product_image');
};
