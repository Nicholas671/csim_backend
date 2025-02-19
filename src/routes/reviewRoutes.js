const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authMiddleware');

// Define routes using the router object, not app
router.get('/', (req, res) => {
    res.send('Reviews');
});

router.post('/', (req, res) => {
    res.send('Create Review');
});

router.put('/:reviewId', (req, res) => {
    res.send('Update Review');
});

router.delete('/:reviewId', (req, res) => {
    res.send('Delete Review');
});

// Use the controller and authentication middleware for specific routes
router.post('/:itemId/reviews', authenticateToken, reviewController.createReview);
router.get('/me', authenticateToken, reviewController.getReviewById);
router.put('/:userId/reviews/:reviewId', authenticateToken, reviewController.updateReview);
router.delete('/:userId/reviews/:reviewId', authenticateToken, reviewController.deleteReview);

module.exports = router;
