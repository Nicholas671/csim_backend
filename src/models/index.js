const User = require('./User');
const Item = require('./Item');
const Review = require('./Review');
const Comment = require('./Comment');

// Define associations
require('./associations'); // Import associations

module.exports = { User, Item, Review, Comment };
