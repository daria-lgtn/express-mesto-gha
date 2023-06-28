const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { URL_REGEX } = require('../constants');
const {
  getUsers, updateMe, getUserById, updateMeAvatar, getCurrentUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrate(({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
})), getUserById);
router.patch('/me', celebrate(({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
})), updateMe);
router.patch('/me/avatar', celebrate(({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEX),
  }),
})), updateMeAvatar);

module.exports = router;
