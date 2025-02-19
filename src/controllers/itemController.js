const { Item, Review } = require('../models');

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
        const item = await Item.findByPk(req.params.itemId);
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
        const reviews = await Review.findAll({ where: { itemId: req.params.itemId } });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};
