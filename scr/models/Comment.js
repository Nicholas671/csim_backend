const { Pool } = require('pg');
const pool = require('../config/db');

const Comment = {
    create: async (text, userId, reviewId) => {
        const result = await pool.query('INSERT INTO comments (text, userId, reviewId) VALUES ($1, $2, $3) RETURNING *', [text, userId, reviewId]);
        return result.rows[0];
    },
    update: async (id, text) => {
        const result = await pool.query('UPDATE comments SET text = $1 WHERE id = $2 RETURNING *', [text, id]);
        return result.rows[0];
    },
    delete: async (id) => {
        await pool.query('DELETE FROM comments WHERE id = $1', [id]);
    }
};

module.exports = Comment;
