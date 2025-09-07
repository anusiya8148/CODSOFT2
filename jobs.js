import express from 'express';
import Job from '../models/Job.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Create job (Employer)
router.post('/', requireAuth, requireRole('employer'), async (req, res) => {
  const job = await Job.create({ ...req.body, postedBy: req.user.id });
  res.status(201).json(job);
});

// Public list + search
router.get('/', async (req, res) => {
  const { q, location, type, page = 1, limit = 12 } = req.query;
  const query = { isActive: true };
  if (location) query.location = new RegExp(location, 'i');
  if (type) query.type = type;
  if (q) query.$text = { $search: q };

  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Job.countDocuments(query);
  res.json({ jobs, count });
});

// Job detail
router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id).populate(
    'postedBy',
    'name avatar'
  );
  if (!job) return res.status(404).json({ message: 'Not found' });
  res.json(job);
});

// Employer's jobs
router.get(
  '/me/list',
  requireAuth,
  requireRole('employer'),
  async (req, res) => {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(jobs);
  }
);

// Update/Delete job
router.put('/:id', requireAuth, requireRole('employer'), async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, postedBy: req.user.id },
    req.body,
    { new: true }
  );
  res.json(job);
});
router.delete(
  '/:id',
  requireAuth,
  requireRole('employer'),
  async (req, res) => {
    await Job.findOneAndDelete({ _id: req.params.id, postedBy: req.user.id });
    res.json({ ok: true });
  }
);

export default router;
