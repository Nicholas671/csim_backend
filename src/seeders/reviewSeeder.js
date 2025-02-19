const pool = require('../config/db');

// Dummy reviews data
const reviews = [
    { text: 'A thrilling adventure with Jesse James!', rating: 5 },
    { text: 'An average western movie.', rating: 3 },
    { text: 'Not the best portrayal of Jesse James.', rating: 2 },
    { text: 'An absolute classic! Must watch!', rating: 5 },
    { text: 'Decent movie with good performances.', rating: 4 },
];

// Function to get random user and item IDs
const getRandomId = async (table) => {
    const result = await pool.query(`SELECT id FROM ${table} ORDER BY RANDOM() LIMIT 1`);
    return result.rows[0].id;
};

// Seed the reviews table
const seedReviews = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const review of reviews) {
            const userId = await getRandomId('users');
            const itemId = await getRandomId('items');
            await client.query(
                'INSERT INTO reviews (text, rating, userId, itemId) VALUES ($1, $2, $3, $4)',
                [review.text, review.rating, userId, itemId]
            );
        }

        await client.query('COMMIT');
        console.log('Reviews seeded successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error seeding reviews:', error);
    } finally {
        client.release();
    }
};

// Run the seed function
seedReviews();
