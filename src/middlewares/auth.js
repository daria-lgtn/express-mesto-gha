const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../constants');
const { ErrorAuthorization } = require('../errors/ErrorAuthorization');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ErrorAuthorization('Неправильные почта или пароль'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new ErrorAuthorization('Неправильные почта или пароль'));
  }

  req.user = payload;
  return next();
};
