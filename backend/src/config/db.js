const mongoose = require('mongoose');

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }
  try {
    let uri = process.env.MONGO_URI;

    const isLocalhost = !uri || uri.includes('localhost') || uri.includes('127.0.0.1');
    if (isLocalhost && process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
      console.log('No external MongoDB found - starting in-memory MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      let mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log(`In-memory MongoDB started at: ${uri}`);
    } else if (!uri) {
      console.warn('Warning: MONGO_URI environment variable is missing on production server.');
      return;
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
  }
};

module.exports = connectDB;
