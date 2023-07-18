const jwt = require('jsonwebtoken');
require('dotenv').config();

const getGwtToken = (id) => jwt.sign(
  { id },
  process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' },
);

module.exports = getGwtToken;
