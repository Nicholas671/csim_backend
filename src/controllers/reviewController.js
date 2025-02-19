const Review = require('../models/Review');

exports.createReview = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const { itemId } = req.params;
        const review = await Review.create(text, rating, req.user.id, itemId);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findById(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch review' });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const review = await Review.update(req.params.reviewId, text, rating);
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        await Review.delete(req.params.reviewId);
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};
