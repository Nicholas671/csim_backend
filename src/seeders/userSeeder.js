const bcrypt = require('bcryptjs');
const { User } = require('../models'); // Assuming you have a User model defined in your models directory

// Dummy users data
const users = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'user3', password: 'password3' },
];

// Seed the users table
const seedUsers = async () => {
    try {
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await User.create({
                username: user.username,
                password: hashedPassword,
            });
        }
        console.log('Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users:', error);
    }
};

// Run the seed function
seedUsers();
