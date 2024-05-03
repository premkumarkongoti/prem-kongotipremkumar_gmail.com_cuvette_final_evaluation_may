// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) throw new Error('Authentication failed');
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) throw new Error('User not found');
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

module.exports = authMiddleware;
