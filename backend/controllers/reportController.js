const SkillAnalysis = require('../models/SkillAnalysis');
const LearningRoadmap = require('../models/LearningRoadmap');
const CareerRole = require('../models/CareerRole');

// @desc    Get aggregated analysis report for viewing or PDF export
// @route   GET /api/reports/:analysisId
const getAnalysisReport = async (req, res, next) => {
  try {
    const { analysisId } = req.params;

    const analysis = await SkillAnalysis.findById(analysisId);
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis record not found.'
      });
    }

    if (analysis.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own reports.'
      });
    }

    const roadmap = await LearningRoadmap.findOne({ analysisId: analysis._id });
    const role = await CareerRole.findOne({ slug: analysis.targetRoleSlug });

    const report = {
      generatedAt: new Date(),
      user: {
        name: req.user.name,
        email: req.user.email,
        experienceLevel: req.user.experienceLevel,
        weeklyStudyHours: req.user.weeklyStudyHours
      },
      analysis: {
        id: analysis._id,
        targetRole: analysis.targetRole,
        matchPercentage: analysis.matchPercentage,
        scoringMethod: analysis.scoringMethod,
        scoringExplanation: analysis.scoringExplanation,
        scoreBreakdown: analysis.scoreBreakdown,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        improvementSkills: analysis.improvementSkills,
        recommendations: analysis.recommendations,
        executiveSummary: analysis.executiveSummary,
        createdAt: analysis.createdAt
      },
      roleBenchmark: role ? {
        title: role.title,
        marketDemand: role.marketDemand,
        avgSalary: role.avgSalary,
        requiredSkillsCount: role.requiredSkills.length,
        projectSuggestions: role.projectSuggestions
      } : null,
      roadmap: roadmap ? {
        id: roadmap._id,
        totalWeeks: roadmap.totalWeeks,
        completionStatus: roadmap.completionStatus,
        milestones: roadmap.milestones,
        weeklyGoals: roadmap.weeklyGoals
      } : null
    };

    res.status(200).json({
      success: true,
      report
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnalysisReport
};
