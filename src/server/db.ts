import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      retryWrites: true,
      retryReads: true,
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
      ssl: process.env.NODE_ENV === 'production'
    });
    console.log('MongoDB connected successfully');
    
    // Create demo users on successful connection
    const User = mongoose.model('User');
    const demoUsers = [
      {
        name: 'Admin User',
        email: 'admin@demo.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Faculty User',
        email: 'faculty@demo.com',
        password: 'faculty123',
        role: 'faculty',
      },
      {
        name: 'Student User',
        email: 'student@demo.com',
        password: 'student123',
        role: 'student',
      },
    ];

    for (const userData of demoUsers) {
      try {
        const existingUser = await User.findOne({ email: userData.email });
        if (!existingUser) {
          await User.create(userData);
          console.log(`Created demo user: ${userData.email}`);
        }
      } catch (err) {
        console.error(`Error creating demo user ${userData.email}:`, err);
      }
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit, just log the error
    console.log('Will retry connection...');
  }
};