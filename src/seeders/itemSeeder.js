const fetch = require('node-fetch');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
});

const Item = sequelize.define('Item', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    averageRating: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'items',
    timestamps: false,
});

// Fetch movies from TMDB
const fetchMovies = async () => {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=jesse%20james`);
    const data = await response.json();
    return data.results;
};

// Seed the items table
const seedItems = async () => {
    const movies = await fetchMovies();

    try {
        await sequelize.transaction(async (t) => {
            for (const movie of movies) {
                await Item.create({
                    title: movie.title,
                    description: movie.overview,
                    averageRating: movie.vote_average,
                }, { transaction: t });
            }
        });

        console.log('Items seeded successfully');
    } catch (error) {
        console.error('Error seeding items:', error);
    } finally {
        await sequelize.close();
    }
};

// Run the seed function
seedItems();
