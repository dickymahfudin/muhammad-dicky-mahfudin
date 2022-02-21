exports.up = pgm => {
  pgm.createTable('products', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    sku: { type: 'varchar(255)', notNull: true, unique: true },
    price: { type: 'integer', notNull: true },
    description: { type: 'text' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('products');
};
