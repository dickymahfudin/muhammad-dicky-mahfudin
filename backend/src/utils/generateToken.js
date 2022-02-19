const { generateToken } = require('./auth');

console.log(`Bearer token : ${generateToken()}`);
