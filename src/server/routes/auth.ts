import express from 'express';
import User from '../models/User';
import { generateToken } from '../middleware/auth';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create demo users
router.post('/create-demo-users', async (req, res) => {
  try {
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
      const existingUser = await User.findOne({ email: userData.email });
      if (!existingUser) {
        await User.create(userData);
      }
    }

    res.json({ message: 'Demo users created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;