import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    resumePath: String,
    coverLetter: String,
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'interview', 'rejected', 'hired'],
      default: 'submitted',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Application', applicationSchema);
