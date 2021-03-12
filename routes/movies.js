const routerMovies = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { updateProfileValidator } = require('../middlewares/celebrateValidator');

routerMovies.get('/', getMovies);
routerMovies.post('/', updateProfileValidator, createMovie);
routerMovies.delete('/:movieId', deleteMovie);

module.exports = routerMovies;
