const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod = null;

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;

    // If no real URI is set (still default localhost), spin up in-memory MongoDB
    const isLocalhost = !uri || uri.includes('localhost') || uri.includes('127.0.0.1');
    if (isLocalhost) {
      console.log('🔄 No external MongoDB found — starting in-memory MongoDB...');
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      console.log(`✅ In-memory MongoDB started at: ${uri}`);
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.error('👉 Fix: Update MONGO_URI in .env with your Atlas connection string.');
    // Server stays running — middleware will return 503 for DB-dependent routes
  }
};

module.exports = connectDB;

