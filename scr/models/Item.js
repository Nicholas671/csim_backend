const { Pool } = require('pg');
const pool = require('../config/db');

const Item = {
    findAll: async () => {
        const result = await pool.query('SELECT * FROM items');
        return result.rows;
    },
    findById: async (id) => {
        const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
        return result.rows[0];
    },
    create: async (title, description, averageRating) => {
        const result = await pool.query('INSERT INTO items (title, description, averageRating) VALUES ($1, $2, $3) RETURNING *', [title, description, averageRating]);
        return result.rows[0];
    }
};

module.exports = Item;
