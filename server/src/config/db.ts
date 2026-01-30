import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';

dotenv.config();

const connectDB = async (): Promise<void> => {
  let mongoURI = process.env.MONGO_URI;

  try {
    if (mongoURI) {
      // Try connecting with a short timeout to fail fast if unreachable
      await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
      console.log('✓ MongoDB connected successfully');
    } else {
        throw new Error("MONGO_URI is not defined");
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('✗ MongoDB connection error:', message);
    console.log('⚠ Attempting to start In-Memory MongoDB...');

    try {
      const mongod = await MongoMemoryServer.create();
      mongoURI = mongod.getUri();
      console.log(`✓ In-Memory MongoDB started at ${mongoURI}`);
      
      await mongoose.connect(mongoURI);
      console.log('✓ MongoDB connected successfully (In-Memory)');
    } catch (fallbackErr) {
       console.error('✗ In-Memory MongoDB start failed:', fallbackErr);
       throw fallbackErr;
    }
  }
};

export default connectDB;
