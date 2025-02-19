const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: false
});

User.createUser = async (username, password) => {
    const user = await User.create({ username, password });
    return user;
};

User.findOneByUsername = async (username) => {
    const user = await User.findOne({ where: { username } });
    return user;
};

User.findById = async (id) => {
    const user = await User.findByPk(id);
    return user;
};

module.exports = User;
