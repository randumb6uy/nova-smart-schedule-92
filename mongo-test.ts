import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://tush1066_db_user:qwer1234@cluster1.gedgxgs.mongodb.net/nova-scheduler?retryWrites=true&w=majority';

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connection successful!');
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('Available collections:', collections.map(c => c.name));
    process.exit(0);
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}

testConnection();