const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Review extends Model { }

Review.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Review',
    tableName: 'reviews',
    timestamps: false
});

module.exports = Review;
