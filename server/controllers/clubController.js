// controllers/clubController.js
const Club = require('../models/Club');

exports.getCredits = async (req, res) => {
  const club = await Club.findById(req.club._id);
  res.send({ credits: club.credits });
};

exports.resetCredits = async () => {
  await Club.updateMany({}, { $set: { credits: 7 } });
};
