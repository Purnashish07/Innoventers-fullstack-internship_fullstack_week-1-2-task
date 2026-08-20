const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');

const app = express();

app.use(cors({
  origin: (origin, callback) => callback(null, true),
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Auto connect/check DB before handling API requests
app.use(async (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    try {
      await connectDB();
    } catch (err) {
      console.error('DB Auto Connection error:', err.message);
    }
  }
  next();
});

app.get('/', (req, res) => res.json({ success: true, msg: 'API Running... Week 1-2 Complete' }));
app.get('/api', (req, res) => res.json({ success: true, msg: 'API Running... Week 1-2 Complete' }));
app.use('/api/auth', authRoutes);

module.exports = app;
