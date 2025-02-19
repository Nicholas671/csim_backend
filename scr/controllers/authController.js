const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwtUtils');
const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword);
    res.json({ user });
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne(username);
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send('Unauthorized');
    }
    const token = generateToken(user);
    res.json({ token });
};

exports.me = async (req, res) => {
    const user = await User.findById(req.user.id);
    res.json({ user });
};
