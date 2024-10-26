// routes/bookingRoutes.js
const express = require('express');
const { protect, admin } = require('../middleware/auth');
const { createBooking, cancelBooking } = require('../controllers/bookingController');
const router = express.Router();

router.post('/', protect, createBooking);
router.delete('/:id', protect, cancelBooking);

module.exports = router;
