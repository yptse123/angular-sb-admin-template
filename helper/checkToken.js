const expressJwt = require('express-jwt');
const fs = require('fs');
const RSA_PUBLIC_KEY = fs.readFileSync('./public.key');

const checkIfAuthenticated = expressJwt({
    secret: RSA_PUBLIC_KEY
});

module.exports = checkIfAuthenticated;
