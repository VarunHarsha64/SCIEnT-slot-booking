// controllers/bookingController.js
const Booking = require('../models/Booking');
const Club = require('../models/Club');
const sendApprovalEmail = require('../utils/email');

exports.createBooking = async (req, res) => {
  const { slotTime, reason } = req.body;
  const club = await Club.findById(req.club._id);
  if (club.credits <= 0 && club.name !== 'Scient') return res.status(403).send('Insufficient credits');

  const booking = new Booking({ club: club._id, slotTime, reason });
  await booking.save();
  club.credits -= 1;
  await club.save();

  sendApprovalEmail(club.name, slotTime, reason);
  res.send({ message: 'Booking request created, awaiting approval.' });
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) return res.status(404).send('Booking not found.');

  try {
    await booking.cancel();
    res.send({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
