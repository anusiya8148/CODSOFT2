import express from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { sendMail } from '../utils/email.js';

const router = express.Router();

// Apply to a job (Candidate)
router.post('/', requireAuth, async (req, res) => {
  const { jobId, coverLetter, resumePath } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });

  const existing = await Application.findOne({ job: jobId, candidate: req.user.id });
  if (existing) return res.status(400).json({ message: 'Already applied' });

  const app = await Application.create({ job: jobId, candidate: req.user.id, coverLetter, resumePath });

  // Emails
  const employer = await User.findById(job.postedBy);
  const candidate = await User.findById(req.user.id);
  await sendMail({
    to: candidate.email,
    subject: 'Application submitted: ${job.title} at ${job.company}',
    html: "<p>Hi ${candidate.name},</p><p>Your application for <b>${job.title}</b> was submitted successfully.</p>"
  });
  await sendMail({
    to: employer.email,
    subject: 'New application for ${job.title}',
    html: "<p>${candidate.name} applied for <b>${job.title}</b>.</p>"
  });

  res.status(201).json(app);
});

// Candidate: my applications
router.get('/me', requireAuth, async (req, res) => {
  const apps = await Application.find({ candidate: req.user.id }).populate({ path: 'job', select: 'title company location' });
  res.json(apps);
});

// Employer: apps for my job
router.get('/job/:jobId', requireAuth, requireRole('employer'), async (req, res) => {
  const apps = await Application.find({ job: req.params.jobId }).populate('candidate', 'name email');
  res.json(apps);
});

export default router;