const { Pool } = require('pg');
const pool = require('../config/db');

const User = {
    create: async (username, password) => {
        const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
        return result.rows[0];
    },
    findOne: async (username) => {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        return result.rows[0];
    },
    findById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }
};

module.exports = User;
