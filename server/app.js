// app.js
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const dotenv = require('dotenv');
dotenv.config()
const cors = require('cors');


// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/clubs', require('./routes/clubRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));

app.use('/api/temp', require('./temporary/temp-route'));

// Connect DB and Start Server
connectDB();
const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
