// controllers/seedController.js
const bcrypt = require("bcrypt");
const Club = require("../models/Club");

exports.seedClubs = async (req, res) => {
  try {
    // Sample clubs data to seed
    const clubsData = [
      {
        name: "Scient",
        credits: Infinity,
        password: await bcrypt.hash("password1", 12),
        logo : 'change to logo-url',
        isAdmin : true,
      },
      {
        name: "Delta",
        credits: 7,
        password: await bcrypt.hash("password2", 12),
        logo : 'change to logo-url',
      },
      {
        name: "180DC",
        credits: 7,
        password: await bcrypt.hash("password3", 12),
        logo : 'change to logo-url',
      },
    ];

    // Delete existing clubs (optional)
    await Club.deleteMany({}); // Remove all clubs for a clean slate

    // Insert the clubs into the database
    await Club.insertMany(clubsData);

    res.status(201).send({ message: "Clubs seeded successfully!" });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).send({ message: "Error seeding clubs" });
  }
};
