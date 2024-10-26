// utils/createSlots.js
const Slot = require('../models/Slot'); // Slot model

const createSlotsForWeek = async () => {
  const now = new Date();
  const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  // Check if slots for the week already exist
  const existingSlots = await Slot.find({
    startTime: { $gte: startOfWeek, $lt: endOfWeek }
  });

  if (existingSlots.length > 0) {
    console.log('Slots for the week already exist. Deleting existing slots...');
    await Slot.deleteMany({ startTime: { $gte: startOfWeek, $lt: endOfWeek } });
    console.log('All existing slots deleted.');
  }

  const rooms = ['Room1', 'Room2', 'Conference Hall']; // Define room identifiers

  // Create slots for each room
  for (let day = 0; day < 7; day++) {
    for (let hour = 0; hour < 24; hour++) {
      for (const room of rooms) {
        const startTime = new Date(startOfWeek);
        startTime.setDate(startOfWeek.getDate() + day);
        startTime.setHours(hour);
        startTime.setMinutes(0);

        console.log(`Creating slot for room ${room} at ${startTime}`);

        // Create the 30-minute slot
        const slot = new Slot({ room, startTime });
        await slot.save();

        // Create the next slot (30 minutes later)
        const slotPlus30Min = new Slot({ room, startTime: new Date(startTime.getTime() + 30 * 60 * 1000) });
        await slotPlus30Min.save();
      }
    }
  }

  console.log('Slots for the week created successfully.');
};

module.exports = createSlotsForWeek;
