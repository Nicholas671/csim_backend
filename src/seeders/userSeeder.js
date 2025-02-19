const bcrypt = require('bcryptjs');
const pool = require('../config/db');

// Dummy users data
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
];

// Seed the users table
const seedUsers = async () => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await client.query(
                'INSERT INTO users (username, password) VALUES ($1, $2)',
                [user.username, hashedPassword]
            );
        }

        await client.query('COMMIT');
        console.log('Users seeded successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error seeding users:', error);
    } finally {
        client.release();
    }
};

// Run the seed function
seedUsers();
