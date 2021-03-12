const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

// Валидируем регистрацию перед отправкой на контроллер
module.exports.registerValidate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Имя должно содержать не меньше 2 символов',
        'string.max': 'Имя не может быть больше 30 символов',
      }),
    email: Joi.string().required().email().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    })
      .messages({
        'any.required': 'Заполните поле',
      }),
    password: Joi.string().required().min(3).messages({
      'string.min': 'Пароль должен быть минимум 3 символа',
      'any.required': 'Вы не ввели пароль',
    }),
  }),
});

// Валидируем авторизацию перед отправкой на контроллер
module.exports.loginValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    })
      .messages({
        'any.required': 'Заполните поле',
      }),
    password: Joi.string().required().min(3).messages({
      'string.min': 'Пароль должен быть минимум 3 символа',
      'any.required': 'Заполните поле',
    }),
  }),
});

// Валидируем обновление профиля перед отправкой на контроллер
module.exports.updateProfileValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom((value, helper) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helper.message('Невалидный email');
    }),
    name: Joi.string().min(2).max(30).messages({
      'string.min': 'Информация о себе должна содержать не меньше 2 символов',
      'string.max': 'Информация о себе должна быть больше 30 символов',
    }),
  }),
});

// Валидируем создание фильма перед отправкой на контроллер
module.exports.createMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидный url у image');
    }),
    trailer: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидный url у trailer');
    }),
    thumbnail: Joi.string().required().custom((value, helper) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helper.message('Невалидный url у thumbnail');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});
