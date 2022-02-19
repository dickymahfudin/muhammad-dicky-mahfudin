const jwt = require('jsonwebtoken');
require('dotenv').config();
const scretKey = process.env.APP_SECRET_KEY;

const auth = {
  generateToken: () => {
    const token = jwt.sign({ description: 'doa ibu' }, scretKey);
    return token;
  },
  verifyToken: async (decode, request) => {
    return { isValid: true };
  },
};

module.exports = auth;
