import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    avatar: String,
    role: {
      type: String,
      enum: ['candidate', 'employer', 'admin'],
      default: 'candidate',
    },
    headline: String,
    location: String,
    skills: [String],
    bio: String,
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
