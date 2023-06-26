const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_KEY } = require('../constants');
const { NotFoundError } = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError();
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY);

      res.send({ token });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError();
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => User.findOne({ _id: user._id }))
    .then((data) => res.send({ data }))
    .catch(next);
};

module.exports.updateMe = (req, res, next) => {
  const userId = req.user._id;
  const { name, about } = req.body;

  User.findByIdAndUpdate(userId, {
    name, about,
  }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError();
      }
    })
    .catch(next);
};

module.exports.updateMeAvatar = (req, res, next) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(userId, {
    avatar,
  }, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError();
      }
    })
    .catch(next);
};
