const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

// Поиск фильмов сохраненных пользователем
module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      next(err);
    });
};

// Создание фильма
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Запрос неправильно сформирован');
        return next(error);
      }
      return next(err);
    });
};

// Удаление фильма
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильм не найден');
      }
      if (String(movie.owner) !== String(req.user._id)) {
        throw new BadRequestError('Можно удалить только свой фильм');
      }
      Movie.findByIdAndRemove(movie._id)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError('Запрос неправильно сформирован');
        return next(error);
      }
      return next(err);
    });
};
