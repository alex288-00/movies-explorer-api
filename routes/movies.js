const routerMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidator, idValidator } = require('../middlewares/celebrateValidator');

routerMovies.get('/', getMovies);
routerMovies.post('/', createMovieValidator, createMovie);
routerMovies.delete('/:movieId', idValidator, deleteMovie);

module.exports = routerMovies;
