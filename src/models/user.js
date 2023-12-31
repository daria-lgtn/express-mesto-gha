const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');
const { URL_REGEX } = require('../constants');
const { ErrorAuthorization } = require('../errors/ErrorAuthorization');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'invalid email'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v) => URL_REGEX.test(v),
      message: 'Некорректная ссылка',
    },
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorAuthorization('Необходима авторизация');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorAuthorization('Необходима авторизация');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
