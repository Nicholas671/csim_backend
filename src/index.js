const express = require('express');
require('dotenv').config();
const sequelize = require('./config/db'); // Import Sequelize instance
const { User, Item, Review, Comment } = require('./models/associations'); // Import models with correct path

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(express.json()); // Middleware to parse JSON

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/items/:itemId/reviews', reviewRoutes);
app.use('/api/items/:itemId/reviews/:reviewId/comments', commentRoutes);

// Initialize function to start the server
const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected');

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1); // Exit the process with failure
    }
};

// Run the initialization
init();
