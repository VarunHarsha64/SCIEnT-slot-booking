// models/Slot.js
const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema({
  room: { type: String, required: true }, // Use string for room identifiers
  startTime: { type: Date, required: true, unique: true },
  booked: { type: Boolean, default: false },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' }, // Reference to the booking
});

module.exports = mongoose.model('Slot', slotSchema);
