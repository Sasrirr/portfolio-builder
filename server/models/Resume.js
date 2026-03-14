import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // We will hardcode this for now until we add Authentication
  personalInfo: { type: Object, default: {} },
  experience: { type: Array, default: [] },
  education: { type: Array, default: [] },
  skills: { type: Array, default: [] },
  projects: { type: Array, default: [] },
  achievements: { type: Array, default: [] },
  hobbies: { type: Array, default: [] },
  settings: { type: Object, default: {} }
}, { timestamps: true });

export default mongoose.model('Resume', resumeSchema);