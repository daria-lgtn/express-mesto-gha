const User = require('../models/user');
const { NotFoundError } = require('../errors/NotFound');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
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
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
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
