const express = require('express');
require('dotenv').config();
const pool = require('./config/db');
const { User, Item, Review, Comment } = require('./models');
require('./models/associations'); // Import associations

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

pool.connect().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
