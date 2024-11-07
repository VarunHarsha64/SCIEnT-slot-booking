// controllers/clubController.js
const Club = require('../models/Club');

exports.getCredits = async (req, res) => {
  const club = await Club.findById(req.club._id);
  res.send({ credits: club.credits });
};

exports.resetCredits = async () => {
  await Club.updateMany({}, { $set: { credits: 7 } });
};

exports.getAvailableSlots = async (req, res) => {
  try {
    const availableSlots = await Slot.find({ booked: false });
    res.json(availableSlots);
  } catch (error) {
    res.status(500).send("Error fetching available slots");
  }
};