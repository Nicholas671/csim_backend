const { Comment, User, Review } = require('../models');
const { Sequelize } = require('sequelize'); // Import Sequelize

// Dummy comments data
const comments = [
    { text: 'I completely agree with this review!' },
    { text: 'I think the movie deserves a higher rating.' },
    { text: 'Interesting take on Jesse James.' },
    { text: 'I didn’t like this movie as much.' },
    { text: 'Great review, very insightful!' },
];

// Function to get random user and review IDs
const getRandomId = async (model) => {
    const record = await model.findOne({ order: Sequelize.literal('RANDOM()') });
    return record.id;
};

// Seed the comments table
const seedComments = async () => {
    try {
        for (const comment of comments) {
            const userId = await getRandomId(User);
            const reviewId = await getRandomId(Review);
            await Comment.create({
                text: comment.text,
                userId: userId,
                reviewId: reviewId
            });
        }
        console.log('Comments seeded successfully');
    } catch (error) {
        console.error('Error seeding comments:', error);
    }
};

// Run the seed function
seedComments();
