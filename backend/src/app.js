const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// DB readiness check — return 503 if MongoDB is not connected yet
app.use('/api', (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      msg: 'Database not connected. Please check your MONGO_URI in .env and make sure MongoDB is running.',
    });
  }
  next();
});

app.get('/', (req, res) => res.json({ msg: 'API Running... Week 1-2 Complete' }));
app.use('/api/auth', authRoutes);

module.exports = app;

