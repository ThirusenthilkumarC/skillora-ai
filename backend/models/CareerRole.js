const mongoose = require('mongoose');

const requiredSkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Frontend', 'Backend', 'Database', 'DevOps & Cloud', 'Tools & Version Control', 'AI & Data', 'Cybersecurity', 'Design', 'Soft Skills', 'Fundamental'],
    default: 'Fundamental' 
  },
  importance: { 
    type: String, 
    enum: ['Core', 'Recommended', 'Optional'], 
    default: 'Core' 
  },
  minProficiency: { 
    type: String, 
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], 
    default: 'Intermediate' 
  },
  weight: { type: Number, default: 1.0 },
  description: { type: String, default: '' }
}, { _id: false });

const projectSuggestionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Intermediate' },
  description: { type: String, required: true },
  technologies: [{ type: String }],
  portfolioImpact: { type: String, default: 'High' }
}, { _id: false });

const careerRoleSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    default: 'Software Engineering'
  },
  icon: {
    type: String,
    default: 'Code'
  },
  shortDescription: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  marketDemand: {
    type: String,
    enum: ['Moderate', 'High', 'Very High', 'Exponential'],
    default: 'High'
  },
  avgSalary: {
    type: String,
    default: '$85,000 - $130,000'
  },
  requiredSkills: [requiredSkillSchema],
  projectSuggestions: [projectSuggestionSchema],
  learningTopics: [{
    topic: { type: String, required: true },
    priority: { type: String, enum: ['High', 'Medium', 'Low'], default: 'High' },
    resources: [{ type: String }]
  }],
  interviewPrepFocus: [{ type: String }]
}, {
  timestamps: true
});

module.exports = mongoose.model('CareerRole', careerRoleSchema);
