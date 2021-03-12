const router = require('express').Router();
const routerUsers = require('./users');
const routerMovies = require('./movies');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { registerValidate, loginValidator } = require('../middlewares/celebrateValidator');

router.post('/signup', registerValidate, createUser);
router.post('/signin', loginValidator, login);

router.use('/users', auth, routerUsers);
router.use('/movies', auth, routerMovies);
router.use('/*', () => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

module.exports = router;
