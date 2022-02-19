const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  port: process.env.DATABASE_PORT || 5432,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

const db = {
  query: async (query, params) => {
    const { rows, fields } = await pool.query(query, params);
    return rows;
  },
};

module.exports = db;
