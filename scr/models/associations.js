const User = require('./User');
const Item = require('./Item');
const Review = require('./Review');
const Comment = require('./Comment');

// Define associations
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });
Item.hasMany(Review, { foreignKey: 'itemId' });
Review.belongsTo(Item, { foreignKey: 'itemId' });
Review.hasMany(Comment, { foreignKey: 'reviewId' });
Comment.belongsTo(Review, { foreignKey: 'reviewId' });
User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Item, Review, Comment };
