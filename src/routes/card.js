const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../constants');
const {
  getCards, createCard, deleteCardById, like, likeUndo,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', celebrate(({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().pattern(URL_REGEX).required(),
  }),
})), createCard);
router.delete('/:cardId', celebrate(({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
})), deleteCardById);
router.put('/:cardId/likes', celebrate(({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
})), like);
router.delete('/:cardId/likes', celebrate(({
  params: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
})), likeUndo);

module.exports = router;
