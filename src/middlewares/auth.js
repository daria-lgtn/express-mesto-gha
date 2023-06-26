const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants');
const { InvalidCredentials } = require('../errors/InvalidCredentials');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new InvalidCredentials();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    throw new InvalidCredentials();
  }

  req.user = payload;
  return next();
};
