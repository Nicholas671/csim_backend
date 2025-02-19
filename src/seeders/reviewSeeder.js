const { Sequelize } = require('sequelize'); // Import Sequelize
const sequelize = require('../config/db'); // Import your Sequelize instance
const { User, Item, Review } = require('../models');

// Dummy reviews data
const reviews = [
    { text: 'A thrilling adventure with Jesse James!', rating: 5 },
    { text: 'An average western movie.', rating: 3 },
    { text: 'Not the best portrayal of Jesse James.', rating: 2 },
    { text: 'An absolute classic! Must watch!', rating: 5 },
    { text: 'Decent movie with good performances.', rating: 4 },
];

// Function to get random user and item IDs
const getRandomId = async (model) => {
    const record = await model.findOne({ order: Sequelize.literal('RANDOM()') });
    return record.id;
};

// Seed the reviews table
const seedReviews = async () => {
    try {
        await sequelize.transaction(async (transaction) => {
            for (const review of reviews) {
                const userId = await getRandomId(User);
                const itemId = await getRandomId(Item);
                await Review.create(
                    { text: review.text, rating: review.rating, userId, itemId },
                    { transaction }
                );
            }
        });
        console.log('Reviews seeded successfully');
    } catch (error) {
        console.error('Error seeding reviews:', error);
    } finally {
        await sequelize.close();
    }
};

// Run the seed function
seedReviews();
