const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;

  User.findOne({ _id: userId })
    .then((users) => res.send({ data: users }))
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
  const { name, about, avatar } = req.body;

  User.updateOne({
    _id: userId, name, about, avatar,
  })
    .then((user) => res.send({ data: user }))
    .catch(next);
};
