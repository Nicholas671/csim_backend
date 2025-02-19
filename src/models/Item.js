const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Item = sequelize.define('Item', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    averageRating: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'items',
    timestamps: false
});

const findAll = async () => {
    return await Item.findAll();
};

const findById = async (id) => {
    return await Item.findByPk(id);
};

const create = async (title, description, averageRating) => {
    return await Item.create({ title, description, averageRating });
};

module.exports = {
    Item,       // Export the Item model itself
    findAll,
    findById,
    create
};
