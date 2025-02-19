const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authenticateToken = require('../middlewares/authMiddleware');




router.post('/:reviewId/comments', authenticateToken, commentController.createComment);
router.put('/:userId/comments/:commentId', authenticateToken, commentController.updateComment);
router.delete('/:userId/comments/:commentId', authenticateToken, commentController.deleteComment);

module.exports = router;
