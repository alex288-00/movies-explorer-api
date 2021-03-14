const jwt = require('jsonwebtoken');
const { SECRET_JWT } = require('../config');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, SECRET_JWT);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация!');
  }
  req.user = payload;
  next();
};
