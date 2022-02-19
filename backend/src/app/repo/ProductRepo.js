const BaseRepo = require('./BaseRepo');

class ProductRepo extends BaseRepo {
  constructor() {
    super('products');
  }
  async pagination(page = 1, itemsPerPage = 10) {
    const offset = (page - 1) * itemsPerPage;
    const query = `(SELECT * FROM ${this._tableName} ORDER BY id LIMIT $1 OFFSET $2)`;
    const pagination = await this._db.query(query, [itemsPerPage, offset]);
    return pagination;
  }
  async getBySku(sku) {
    const query = `SELECT sku FROM ${this._tableName} WHERE sku = $1`;
    const getSku = this._db.query(query, [sku]);
    return getSku;
  }
}

module.exports = ProductRepo;
