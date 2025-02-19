const Item = require('../models/Item');
const Review = require('../models/Review');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
};

exports.getReviewsForItem = async (req, res) => {
    try {
        const reviews = await Review.findAllByItemId(req.params.itemId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
