const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, default: 'Technical' },
  proficiency: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], 
    default: 'Beginner' 
  },
  yearsOfExperience: { type: Number, default: 0 }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required']
  },
  targetRole: {
    type: String,
    default: 'Full Stack Developer'
  },
  currentSkills: [skillSchema],
  experienceLevel: {
    type: String,
    enum: ['Student/Fresher', 'Junior (0-2 yrs)', 'Mid-Level (2-5 yrs)', 'Senior (5+ yrs)'],
    default: 'Student/Fresher'
  },
  learningPreferences: {
    type: [String],
    default: ['Hands-on projects', 'Interactive practice', 'Official documentation']
  },
  weeklyStudyHours: {
    type: Number,
    min: [1, 'Study hours must be at least 1'],
    max: [80, 'Study hours cannot exceed 80'],
    default: 12
  },
  bio: {
    type: String,
    maxlength: [300, 'Bio cannot exceed 300 characters'],
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
