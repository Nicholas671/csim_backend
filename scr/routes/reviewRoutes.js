const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/authMiddleware');


app.get('/api/reviews', (req, res) => {
    res.send('Reviews');
});
app.post('/api/reviews', (req, res) => {
    res.send('Create Review');
});
app.put('/api/reviews/:reviewId', (req, res) => {
    res.send('Update Review');
});
app.delete('/api/reviews/:reviewId', (req, res) => {
    res.send('Delete Review');
});




router.post('/:itemId/reviews', authenticateToken, reviewController.createReview);
router.get('/me', authenticateToken, reviewController.getReviewById);
router.put('/:userId/reviews/:reviewId', authenticateToken, reviewController.updateReview);
router.delete('/:userId/reviews/:reviewId', authenticateToken, reviewController.deleteReview);

module.exports = router;
