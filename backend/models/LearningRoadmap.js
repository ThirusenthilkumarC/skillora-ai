const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  skillCategory: { type: String, default: 'General' },
  estimatedHours: { type: Number, default: 2 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
  resourceSuggestion: { type: String, default: '' }
}, { _id: false });

const weeklyGoalSchema = new mongoose.Schema({
  weekNumber: { type: Number, required: true },
  title: { type: String, required: true },
  focus: { type: String, required: true },
  targetSkill: { type: String, default: '' },
  tasks: [taskSchema],
  miniProject: {
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    deliverable: { type: String, default: '' },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null }
  }
}, { _id: false });

const milestoneSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  targetWeek: { type: Number, required: true },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null }
}, { _id: false });

const learningRoadmapSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  analysisId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillAnalysis',
    required: true
  },
  targetRole: {
    type: String,
    required: true
  },
  targetRoleSlug: {
    type: String,
    default: ''
  },
  totalWeeks: {
    type: Number,
    default: 8
  },
  estimatedWeeklyHours: {
    type: Number,
    default: 10
  },
  completionStatus: {
    completedTasks: { type: Number, default: 0 },
    totalTasks: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 }
  },
  milestones: [milestoneSchema],
  weeklyGoals: [weeklyGoalSchema],
  generationType: {
    type: String,
    enum: ['ai', 'rule-based'],
    default: 'rule-based'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('LearningRoadmap', learningRoadmapSchema);
