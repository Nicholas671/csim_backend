const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    // Retrieve token from the 'Authorization' header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    // If no token is found, return unauthorized
    if (!token) return res.status(401).send('Unauthorized');

    // Verify the token
    jwt.verify(token, 'YOUR_SECRET_KEY', (err, user) => {
        if (err) return res.status(403).send('Forbidden');
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
