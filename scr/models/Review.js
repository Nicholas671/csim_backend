const { Pool } = require('pg');
const pool = require('../config/db');

const Review = {
    create: async (text, rating, userId, itemId) => {
        const result = await pool.query('INSERT INTO reviews (text, rating, userId, itemId) VALUES ($1, $2, $3, $4) RETURNING *', [text, rating, userId, itemId]);
        return result.rows[0];
    },
    findById: async (id) => {
        const result = await pool.query('SELECT * FROM reviews WHERE id = $1', [id]);
        return result.rows[0];
    },
    update: async (id, text, rating) => {
        const result = await pool.query('UPDATE reviews SET text = $1, rating = $2 WHERE id = $3 RETURNING *', [text, rating, id]);
        return result.rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
    }
};

module.exports = Review;
