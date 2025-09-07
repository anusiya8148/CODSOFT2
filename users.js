import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// get logged-in user
router.get('/me', requireAuth, async (req, res) => {
  const me = await User.findById(req.user.id);
  res.json(me);
});

// update profile
router.put('/me', requireAuth, async (req, res) => {
  const { name, headline, location, skills, bio, role } = req.body;
  const me = await User.findByIdAndUpdate(
    req.user.id,
    { name, headline, location, skills, bio, role },
    { new: true }
  );
  res.json(me);
});

export default router;
