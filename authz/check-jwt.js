const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const {DOMAIN, AUDIENCE} = require('../utils/config.js');


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${DOMAIN}/.well-known/jwks.json`,
  }),

  audience: AUDIENCE,
  issuer: `https://${DOMAIN}/`,
  algorithms: ['RS256'],
});


module.exports = {
  checkJwt,
};
