const router = require('express').Router();
const {
  getUsers, updateMe, createUser, getUserById, updateMeAvatar,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.patch('/me', updateMe);
router.patch('/me/avatar', updateMeAvatar);

module.exports = router;
