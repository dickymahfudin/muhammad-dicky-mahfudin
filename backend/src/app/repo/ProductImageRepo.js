const BaseRepo = require('./BaseRepo');

class ProductImageRepo extends BaseRepo {
  constructor() {
    super('product_image');
  }
  async getByProductId(productId) {
    const query = `SELECT * FROM ${this._tableName} WHERE product_id = $1`;
    const images = await this._db.query(query, [productId]);
    return images;
  }
}

module.exports = ProductImageRepo;
