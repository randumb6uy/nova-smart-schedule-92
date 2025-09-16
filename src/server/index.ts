import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db.js';
import authRoutes from './routes/auth.js';
import scheduleRoutes from './routes/schedule.js';

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
});

const app = express();
const PORT = process.env.PORT || 5000;

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    message: process.env.NODE_ENV === 'production' 
      ? 'Internal Server Error' 
      : err.message 
  });
});

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Add security headers
app.use(compression()); // Compress responses

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? [process.env.FRONTEND_URL || ''] 
    : 'http://localhost:8082',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10kb' })); // Limit body size

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/schedules', scheduleRoutes);

// Create demo users on server start
fetch('http://localhost:5000/api/auth/create-demo-users', {
  method: 'POST',
}).catch(console.error);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  fetch('http://localhost:' + PORT + '/api/auth/create-demo-users', {
    method: 'POST'
  }).then(() => {
    console.log('Demo users created successfully');
  }).catch(err => {
    console.error('Error creating demo users:', err);
  });
});