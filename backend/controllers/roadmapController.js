const SkillAnalysis = require('../models/SkillAnalysis');
const LearningRoadmap = require('../models/LearningRoadmap');
const { generateRoadmap } = require('../services/roadmapGeneratorService');

// @desc    Generate and save a personalized learning roadmap
// @route   POST /api/roadmaps
const createRoadmap = async (req, res, next) => {
  try {
    const { analysisId, weeklyStudyHours } = req.body;

    if (!analysisId) {
      return res.status(400).json({
        success: false,
        message: 'analysisId is required to generate a roadmap.'
      });
    }

    const analysis = await SkillAnalysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Associated skill analysis record not found.'
      });
    }

    // Verify ownership
    if (analysis.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to analysis.'
      });
    }

    const hours = Number(weeklyStudyHours) || req.user.weeklyStudyHours || 10;

    const generated = generateRoadmap({
      targetRole: analysis.targetRole,
      missingSkills: analysis.missingSkills,
      improvementSkills: analysis.improvementSkills,
      weeklyStudyHours: hours,
      analysisType: analysis.analysisType
    });

    // Check if an existing roadmap exists for this analysis, update or create new
    let roadmap = await LearningRoadmap.findOne({
      userId: req.user._id,
      analysisId: analysis._id
    });

    if (roadmap) {
      roadmap.weeklyGoals = generated.weeklyGoals;
      roadmap.milestones = generated.milestones;
      roadmap.totalWeeks = generated.totalWeeks;
      roadmap.estimatedWeeklyHours = generated.estimatedWeeklyHours;
      roadmap.completionStatus = generated.completionStatus;
      await roadmap.save();
    } else {
      roadmap = await LearningRoadmap.create({
        userId: req.user._id,
        analysisId: analysis._id,
        targetRole: analysis.targetRole,
        targetRoleSlug: analysis.targetRoleSlug,
        totalWeeks: generated.totalWeeks,
        estimatedWeeklyHours: generated.estimatedWeeklyHours,
        completionStatus: generated.completionStatus,
        milestones: generated.milestones,
        weeklyGoals: generated.weeklyGoals,
        generationType: generated.generationType
      });
    }

    res.status(201).json({
      success: true,
      roadmap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's learning roadmaps
// @route   GET /api/roadmaps
const getUserRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await LearningRoadmap.find({ userId: req.user._id })
      .populate('analysisId', 'matchPercentage targetRole createdAt')
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single roadmap by ID
// @route   GET /api/roadmaps/:id
const getRoadmapById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const roadmap = await LearningRoadmap.findById(id).populate('analysisId');
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Learning roadmap not found.'
      });
    }

    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own roadmaps.'
      });
    }

    res.status(200).json({
      success: true,
      roadmap
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle/update task completion status
// @route   PATCH /api/roadmaps/:id/tasks/:taskId
const updateTaskStatus = async (req, res, next) => {
  try {
    const { id, taskId } = req.params;
    const { completed } = req.body;

    const roadmap = await LearningRoadmap.findById(id);
    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found.'
      });
    }

    if (roadmap.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only update your own roadmaps.'
      });
    }

    let foundTask = null;
    let totalTasksCount = 0;
    let completedTasksCount = 0;

    // Search and update task
    roadmap.weeklyGoals.forEach(week => {
      week.tasks.forEach(task => {
        totalTasksCount++;
        if (task.id === taskId) {
          task.completed = completed !== undefined ? completed : !task.completed;
          task.completedAt = task.completed ? new Date() : null;
          foundTask = task;
        }
        if (task.completed) {
          completedTasksCount++;
        }
      });
    });

    if (!foundTask) {
      return res.status(404).json({
        success: false,
        message: `Task with ID '${taskId}' not found in this roadmap.`
      });
    }

    // Recompute completion percentages
    const percentage = totalTasksCount > 0
      ? Math.round((completedTasksCount / totalTasksCount) * 100)
      : 0;

    roadmap.completionStatus = {
      completedTasks: completedTasksCount,
      totalTasks: totalTasksCount,
      percentage
    };

    // Update milestones based on week task completions
    roadmap.milestones.forEach(milestone => {
      const milestoneTargetWeek = milestone.targetWeek;
      const targetGoals = roadmap.weeklyGoals.filter(g => g.weekNumber <= milestoneTargetWeek);
      const allTasksForMilestone = targetGoals.flatMap(g => g.tasks);
      const allDone = allTasksForMilestone.length > 0 && allTasksForMilestone.every(t => t.completed);

      milestone.completed = allDone;
      milestone.completedAt = allDone ? (milestone.completedAt || new Date()) : null;
    });

    roadmap.markModified('weeklyGoals');
    roadmap.markModified('milestones');
    roadmap.markModified('completionStatus');
    await roadmap.save();

    res.status(200).json({
      success: true,
      message: `Task status updated successfully.`,
      task: foundTask,
      completionStatus: roadmap.completionStatus,
      milestones: roadmap.milestones
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateTaskStatus
};
