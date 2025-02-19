const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');

class Comment extends Model { }

Comment.init({
    text: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false
});

module.exports = Comment;
