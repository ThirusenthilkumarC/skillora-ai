const mongoose = require('mongoose');
const CareerRole = require('../models/CareerRole');
const seedRoles = require('./seedData');

let mongodInstance = null;

const connectDB = async () => {
  const uri = process.env.MONGODB_URI && process.env.MONGODB_URI.trim();

  if (uri && !uri.includes('<username>')) {
    try {
      console.log('Connecting to configured MongoDB database...');
      await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(` MongoDB Connected successfully to: ${mongoose.connection.host}`);
      await seedDefaultRoles();
      return;
    } catch (err) {
      console.warn(` Failed to connect to configured MongoDB (${err.message}). Falling back to in-memory MongoDB server...`);
    }
  } else {
    console.log('ℹ️ No external MONGODB_URI configured. Starting embedded MongoDB server...');
  }

  // Fallback to MongoMemoryServer for development / instant demo
  try {
    const { MongoMemoryServer } = require('mongodb-memory-server');
    mongodInstance = await MongoMemoryServer.create();
    const inMemoryUri = mongodInstance.getUri();
    await mongoose.connect(inMemoryUri);
    console.log(` Embedded in-memory MongoDB active at: ${inMemoryUri}`);
    await seedDefaultRoles();
  } catch (error) {
    console.error(' Critical Error: Could not connect to any MongoDB instance:', error.message);
    throw error;
  }
};

const seedDefaultRoles = async () => {
  try {
    const count = await CareerRole.countDocuments();
    if (count === 0) {
      console.log(' Seeding career role definitions into database...');
      await CareerRole.insertMany(seedRoles);
      console.log(` Successfully seeded ${seedRoles.length} career roles.`);
    } else {
      console.log(` Database already contains ${count} career roles.`);
    }
  } catch (seedErr) {
    console.error('Error seeding career roles:', seedErr.message);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    if (mongodInstance) {
      await mongodInstance.stop();
    }
  } catch (err) {
    console.error('Error disconnecting database:', err.message);
  }
};

module.exports = { connectDB, disconnectDB };
