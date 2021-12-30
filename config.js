/* eslint-disable no-undef */
require('dotenv').config();

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.NODE_ENV === 'test' ?
  process.env.TEST_MONGODB_URI :
  process.env.MONGODB_URI;

const AUDIENCE= process.env.AUTH0_AUDIENCE;
const DOMAIN = process.env.AUTH0_DOMAIN;

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

module.exports = {
  PORT,
  MONGODB_URI,
  AUDIENCE,
  DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
};
