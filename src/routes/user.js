const router = require('express').Router();
const {
  getUsers, updateMe, getUserById, updateMeAvatar, getCurrentUser,
} = require('../controllers/user');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', getUserById);
router.patch('/me', updateMe);
router.patch('/me/avatar', updateMeAvatar);

module.exports = router;
