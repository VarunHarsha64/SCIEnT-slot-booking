// routes/clubRoutes.js
const express = require('express');
const { protect } = require('../middleware/auth');
const { getCredits,getAvailableSlots } = require('../controllers/clubController');
const router = express.Router();

router.get('/credits', protect, getCredits);
router.get('/slots/available', protect, getAvailableSlots);

module.exports = router;
