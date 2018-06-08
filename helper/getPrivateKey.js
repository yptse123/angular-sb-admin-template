const fs = require('fs');
const RSA_PRIVATE_KEY = fs.readFileSync('./private.key');

module.exports = RSA_PRIVATE_KEY;
