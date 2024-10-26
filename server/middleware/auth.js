// middleware/auth.js
const jwt = require('jsonwebtoken');
const Club = require('../models/Club');

exports.protect = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.club = await Club.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

exports.admin = (req, res, next) => {
  if (!req.club.isAdmin) return res.status(403).send('Access denied.');
  next();
};
