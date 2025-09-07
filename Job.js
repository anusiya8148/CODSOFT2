import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: String,
  type: { type: String, enum: ['Full-time','Part-time','Contract','Internship','Remote'], default: 'Full-time' },
  salaryMin: Number,
  salaryMax: Number,
  description: { type: String, required: true },
  requirements: [String],
  tags: [String],
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

jobSchema.index({ title: 'text', company: 'text', location: 'text', tags: 'text' });

export default mongoose.model('Job', jobSchema);