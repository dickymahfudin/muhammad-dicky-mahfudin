const db = require('../../database');
const { dataToQuery } = require('../../utils');

class BaseRepo {
  _tableName;
  _db = db;
  _dataToQuery = dataToQuery;

  constructor(tableName) {
    this._tableName = tableName;
  }

  async list() {
    const query = `SELECT * FROM ${this._tableName}`;
    const list = await this._db.query(query);
    return list;
  }

  async create(data) {
    const convert = this._dataToQuery(data);
    const query = `INSERT INTO ${this._tableName} (${convert.column}) VALUES (${convert.iteration}) RETURNING *`;
    const create = await this._db.query(query, convert.value);
    return create;
  }

  async getByid(id) {
    const query = `SELECT * FROM ${this._tableName} WHERE id = $1`;
    const getByid = await this._db.query(query, [id]);
    return getByid;
  }

  async updateByid(id, data) {
    const convert = this._dataToQuery(data);
    const length = `$${convert.value.length + 1}`;
    const query = `UPDATE ${this._tableName} SET ${convert.put} WHERE id = ${length} RETURNING *`;
    const editByid = await this._db.query(query, [...convert.value, id]);
    return editByid;
  }

  async deleteById(id) {
    const query = `DELETE FROM ${this._tableName} WHERE id = $1`;
    const deleteById = await this._db.query(query, [id]);
    return deleteById;
  }

  async count() {
    const count = await this._db.query(`SELECT COUNT(*) FROM ${this._tableName}`);
    return count[0].count;
  }
}

module.exports = BaseRepo;
