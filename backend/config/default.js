module.exports = {
  db: {
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432,
    name: process.env.DATABASE_NAME,
  },
};
