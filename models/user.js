const mongoose = require('mongoose');
const emailValidator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимум 2 символа'],
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailValidator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 3,
  },
});

module.exports = mongoose.model('user', userSchema);
