const pool = require('../config/db');

// Dummy comments data
const comments = [
    { text: 'I completely agree with this review!' },
    { text: 'I think the movie deserves a higher rating.' },
    { text: 'Interesting take on Jesse James.' },
    { text: 'I didn’t like this movie as much.' },
    { text: 'Great review, very insightful!' },
];

// Function to get random user and review IDs
const getRandomId = async (table) => {
    const result = await pool.query(`SELECT id FROM ${table} ORDER BY RANDOM() LIMIT 1`);
    return result.rows[0].id;
};

// Seed the comments table
const seedComments = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const comment of comments) {
            const userId = await getRandomId('users');
            const reviewId = await getRandomId('reviews');
            await client.query(
                'INSERT INTO comments (text, userId, reviewId) VALUES ($1, $2, $3)',
                [comment.text, userId, reviewId]
            );
        }

        await client.query('COMMIT');
        console.log('Comments seeded successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error seeding comments:', error);
    } finally {
        client.release();
    }
};

// Run the seed function
seedComments();
