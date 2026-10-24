const mongoose = require('mongoose');

const skillMatchItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: 'Technical' },
  userProficiency: { type: String, default: 'Beginner' },
  requiredProficiency: { type: String, default: 'Intermediate' },
  importance: { type: String, default: 'Core' },
  status: { 
    type: String, 
    enum: ['Matched', 'Improvement Needed', 'Missing'], 
    default: 'Matched' 
  },
  scoreContribution: { type: Number, default: 0 }
}, { _id: false });

const skillAnalysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  targetRole: {
    type: String,
    required: true
  },
  targetRoleSlug: {
    type: String,
    required: true
  },
  matchPercentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  analysisType: {
    type: String,
    enum: ['ai', 'rule-based'],
    default: 'rule-based'
  },
  scoringMethod: {
    type: String,
    default: 'Deterministic weighted baseline matching'
  },
  scoreBreakdown: {
    coreSkillsMatchRate: { type: Number, default: 0 },
    recommendedSkillsMatchRate: { type: Number, default: 0 },
    proficiencyScore: { type: Number, default: 0 },
    matchedCount: { type: Number, default: 0 },
    missingCount: { type: Number, default: 0 },
    improveCount: { type: Number, default: 0 },
    totalRequiredCount: { type: Number, default: 0 }
  },
  matchedSkills: [skillMatchItemSchema],
  missingSkills: [{
    name: { type: String, required: true },
    category: { type: String, default: 'Technical' },
    importance: { type: String, default: 'Core' },
    priority: { type: String, enum: ['Critical', 'High', 'Medium', 'Nice to have'], default: 'High' },
    description: { type: String, default: '' }
  }],
  improvementSkills: [{
    name: { type: String, required: true },
    category: { type: String, default: 'Technical' },
    userProficiency: { type: String, default: 'Beginner' },
    requiredProficiency: { type: String, default: 'Intermediate' },
    gapSummary: { type: String, default: '' }
  }],
  recommendations: [{ type: String }],
  executiveSummary: {
    type: String,
    default: ''
  },
  aiInsight: {
    strengths: [{ type: String }],
    criticalGaps: [{ type: String }],
    fastTrackStrategy: { type: String, default: '' },
    suggestedPortfolioProject: {
      title: { type: String, default: '' },
      description: { type: String, default: '' },
      technologies: [{ type: String }]
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('SkillAnalysis', skillAnalysisSchema);
