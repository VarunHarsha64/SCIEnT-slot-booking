// app.js
const express = require("express");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const createSlotsForWeek = require("./utils/createSlots");
const cron = require('node-cron')

//connect DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/clubs", require("./routes/clubRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/temp", require("./temporary/temp-route"));

//Start Server

cron.schedule("59 23 * * 0", () => {
  console.log("Creating slots for the upcoming week...");
  createSlotsForWeek()
    .then(() => console.log("Slots for the week created successfully."))
    .catch((err) => console.error("Error creating slots:", err));
});

createSlotsForWeek()
  .then(() => {
    console.log("Slots for the week created successfully on startup.");
  })
  .catch((err) => {
    console.error("Error creating slots:", err);
  });

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
