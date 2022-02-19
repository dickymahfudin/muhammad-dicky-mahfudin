exports.up = pgm => {
  pgm.createTable('products', {
    id: { type: 'varchar(255)', primaryKey: true },
    name: { type: 'varchar(255)', notNull: true },
    sku: { type: 'varchar(255)', notNull: true, unique: true },
    price: { type: 'integer', notNull: true },
    description: { type: 'text' },
  });
};

exports.down = pgm => {
  pgm.dropTable('products');
};
