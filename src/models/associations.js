const { Item } = require('./Item'); // Adjusted import
const User = require('./User');
const Review = require('./Review');
const Comment = require('./Comment');

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });

Item.hasMany(Review, { foreignKey: 'itemId' }); // This should now work correctly
Review.belongsTo(Item, { foreignKey: 'itemId' });

Review.hasMany(Comment, { foreignKey: 'reviewId' });
Comment.belongsTo(Review, { foreignKey: 'reviewId' });

User.hasMany(Comment, { foreignKey: 'userId' });
Comment.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Review, Item, Comment };
