// routes/clubRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getCredits } = require('../controllers/clubController');
const router = express.Router();

router.get('/credits', protect, getCredits);

module.exports = router;
