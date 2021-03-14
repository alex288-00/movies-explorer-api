const routerUsers = require('express').Router();
const { getUser, updateProfile } = require('../controllers/users');
const { updateProfileValidator } = require('../middlewares/celebrateValidator');

routerUsers.get('/me', getUser);
routerUsers.patch('/me', updateProfileValidator, updateProfile);

module.exports = routerUsers;
