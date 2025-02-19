const express = require('express');
const pool = require('./config/db');
const { User, Item, Review, Comment } = require('./models');
require('./models/associations'); // Import associations

const app = express();

// Middleware setup, routes, etc.

pool.connect().then(() => {
    console.log('Database connected');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
