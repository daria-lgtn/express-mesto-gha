const Card = require('../models/card');
const { NotFoundError } = require('../errors/NotFound');
const { ErrorAccess } = require('../errors/ErrorAccess');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const userId = req.user._id;
  const { name, link } = req.body;

  Card.create({ name, link, owner: userId })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById({ _id: cardId })
    .then((card) => {
      if (card) {
        if (card.owner !== userId) {
          throw new ErrorAccess('Нет доступа');
        } else {
          return Card.findOneAndDelete({ _id: cardId });
        }
      } else {
        throw new NotFoundError();
      }
    }).then((card) => {
      res.send({ data: card });
    })
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
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError();
      }
    })
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
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError();
      }
    })
    .catch(next);
};
