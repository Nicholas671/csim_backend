const fetch = require('node-fetch');
const pool = require('../config/db');

// Fetch movies from TMDB
const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=jesse%20james`);
    const data = await response.json();
    return data.results;
};

// Seed the items table
const seedItems = async () => {
    const movies = await fetchMovies();
    const client = await pool.connect();

    try {
        await client.query('BEGIN');

        for (const movie of movies) {
            await client.query(
                'INSERT INTO items (title, description, averageRating) VALUES ($1, $2, $3)',
                [movie.title, movie.overview, movie.vote_average]
            );
        }

        await client.query('COMMIT');
        console.log('Items seeded successfully');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error seeding items:', error);
    } finally {
        client.release();
    }
};

// Run the seed function
seedItems();
