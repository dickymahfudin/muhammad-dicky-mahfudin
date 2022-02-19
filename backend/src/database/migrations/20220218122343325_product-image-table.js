exports.up = pgm => {
  pgm.createTable('product_image', {
    id: { type: 'varchar(255)', primaryKey: true },
    product_id: { type: 'varchar(255)', notNull: true, references: '"products"', onDelete: 'cascade' },
    name: { type: 'varchar(50)', notNull: true },
    url: { type: 'varchar(150)', notNull: true },
  });
};

exports.down = pgm => {
  pgm.dropTable('product_image');
};
