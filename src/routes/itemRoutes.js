const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Define routes using the router object, not app
router.get('/', itemController.getAllItems);
router.get('/:itemId', itemController.getItemById);
router.get('/:itemId/reviews', itemController.getReviewsForItem);

module.exports = router;
