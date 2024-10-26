// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Club = require('../models/Club');

exports.login = async (req, res) => {
  const { name, password } = req.body;

  // Check if the club exists
  const club = await Club.findOne({ name });
  if (!club) return res.status(400).send('Invalid name or password.');
  console.log('test1');

  // Compare the provided password with the hashed password in the database
  const isPasswordCorrect = await bcrypt.compare(password, club.password);
  if (!isPasswordCorrect) return res.status(400).send('Invalid name or password.');
  console.log('test2');

  // Generate JWT token
  const token = jwt.sign({ id: club._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
