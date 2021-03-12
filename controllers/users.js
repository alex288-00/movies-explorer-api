const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_JWT } = require('../config');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

// Создание пользователя/регистрация
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с такие email уже зарегистрирован');
      }
      return bcrypt.hash(password, 10)
        .then((hash) => User.create({
          name, email, password: hash,
        }));
    })
    .then((user) => {
      res.send(
        {
          name: user.name,
          email: user.email,
        },
      );
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Запрос неправильно сформирован');
        return next(error);
      }
      return next(err);
    });
};

// Авторизация пользователя, проверяем почту и пароль и возвращаем токен
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }
          return user;
        });
    })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_JWT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

// Получаем данные о пользователе
module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      return res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError('Запрос неправильно сформирован');
        return next(error);
      }
      return next(err);
    });
};

// Обновление профиля
module.exports.updateProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError('Запрос неправильно сформирован');
        return next(error);
      }
      return next(err);
    });
};
