// controllers/bookingController.js
const Booking = require("../models/Booking");
const Slot = require("../models/Slot");
const Club = require("../models/Club");
const sendApprovalEmail = require("../utils/email");

exports.createBooking = async (req, res) => {
  const { slotTime, reason, room } = req.body; // Include room identifier in the request body

  // Find the slot for the requested time and room
  const slot = await Slot.findOne({ startTime: slotTime, room });
  if (!slot) return res.status(404).send("Slot not found.");
  if (slot.booked) return res.status(403).send("Slot is already booked.");

  const club = await Club.findById(req.club._id);
  if (club.credits <= 0 && club.name !== "Scient")
    return res.status(403).send("Insufficient credits");

  const booking = new Booking({
    club: club._id,
    slotTime,
    reason,
    approved: false,
    slot: slot._id, // Reference the slot
  });
  await booking.save();

  sendApprovalEmail(club.name, slotTime, reason);
  res.send({ message: "Booking request created, awaiting approval." });
};

exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id; // Assuming booking ID is passed in the URL
  const booking = await Booking.findById(bookingId).populate("club"); // Populate to get club details if needed

  if (!booking) return res.status(404).send("Booking not found.");

  // Check if the cancellation is allowed (1 hour before slot time)
  const currentTime = new Date();
  const slotStartTime = new Date(booking.slotTime);

  if (currentTime >= new Date(slotStartTime - 60 * 60 * 1000)) {
    return res
      .status(400)
      .send("Cancellation allowed only up to 1 hour before slot start.");
  }

  // Find the corresponding slot and mark it as available
  const slot = await Slot.findOne({ booking: bookingId });
  if (slot) {
    slot.booked = false; // Free the slot
    slot.booking = null; // Clear the reference to the booking
    await slot.save();
  }

  await booking.remove(); // Remove the booking
  res.send({ message: "Booking cancelled successfully." });
};
