const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;

  Card.deleteOne({ _id: cardId })
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.like = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.likeUndo = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } },
    { new: true },
  )
    .then((user) => res.send({ data: user }))
    .catch(next);
};
