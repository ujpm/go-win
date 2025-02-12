import express from 'express';
import { User } from '../models/User';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // Try to count users to test DB connection
    const count = await User.countDocuments();
    res.json({ message: 'Database connection successful', userCount: count });
  } catch (error: any) {
    res.status(500).json({ message: 'Database connection failed', error: error.message || 'Unknown error' });
  }
});

export default router;
