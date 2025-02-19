const jwt = require('jsonwebtoken');

// Secret key used for signing the JWT. Make sure to store this in your .env file
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'your_secret_key';

// Function to generate a JWT
const generateToken = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
    };

    // Sign the token with the payload and secret key. You can adjust the expiration time as needed
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
};

// Function to verify a JWT
const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            resolve(decoded);
        });
    });
};

module.exports = { generateToken, verifyToken };
