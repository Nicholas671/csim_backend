const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

app.get('/api/items', (req, res) => {
    res.send('Items');
});

app.get('/api/items/:itemId', (req, res) => {
    res.send('Item');
});

app.get('/api/items/:itemId/reviews', (req, res) => {
    res.send('Reviews');
});



router.get('/', itemController.getAllItems);
router.get('/:itemId', itemController.getItemById);
router.get('/:itemId/reviews', itemController.getReviewsForItem);

module.exports = router;
