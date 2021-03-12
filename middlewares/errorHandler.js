const { CelebrateError } = require('celebrate');

// Централизованная обработка ошибок
const errorHandler = (err, req, res, next) => {
  if (err instanceof CelebrateError) {
    return res.status(400).send({ message: err.details.get('body').details[0].message });
  }
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  return next();
};

module.exports = errorHandler;
