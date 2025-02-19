const { Review } = require('../models');

exports.createReview = async (req, res) => {
    try {
        const { text, rating } = req.body;
        const { itemId } = req.params;
        const review = await Review.create({
            text,
            rating,
            userId: req.user.id,
            itemId
        });
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create review' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
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
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        review.text = text;
        review.rating = rating;
        await review.save();
        res.json(review);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update review' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ error: 'Review not found' });
        }
        await review.destroy();
        res.json({ message: 'Review deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete review' });
    }
};
