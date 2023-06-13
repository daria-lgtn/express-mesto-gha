const router = require('express').Router();
const {
  getCards, createCard, deleteCardById, like, likeUndo,
} = require('../controllers/card');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:cardId', deleteCardById);
router.put('/:cardId/likes', like);
router.delete('/:cardId/likes', likeUndo);

module.exports = router;
