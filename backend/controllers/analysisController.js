const CareerRole = require('../models/CareerRole');
const SkillAnalysis = require('../models/SkillAnalysis');
const { calculateSkillGap } = require('../services/skillGapService');

// @desc    Perform skill gap analysis and save result
// @route   POST /api/analysis
const createAnalysis = async (req, res, next) => {
  try {
    const { roleSlug, currentSkills = [] } = req.body;

    if (!roleSlug) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a target roleSlug for analysis.'
      });
    }

    const role = await CareerRole.findOne({ slug: roleSlug.toLowerCase() });
    if (!role) {
      return res.status(404).json({
        success: false,
        message: `Career role '${roleSlug}' not found in catalog.`
      });
    }

    // Execute baseline deterministic calculation
    const gapResults = calculateSkillGap(currentSkills, role);

    // Persist analysis to database associated with authenticated user
    const analysis = await SkillAnalysis.create({
      userId: req.user._id,
      targetRole: gapResults.targetRole,
      targetRoleSlug: gapResults.targetRoleSlug,
      matchPercentage: gapResults.matchPercentage,
      analysisType: 'rule-based',
      scoringMethod: gapResults.scoringMethod,
      scoreBreakdown: gapResults.scoreBreakdown,
      matchedSkills: gapResults.matchedSkills,
      missingSkills: gapResults.missingSkills,
      improvementSkills: gapResults.improvementSkills,
      recommendations: gapResults.recommendations,
      executiveSummary: gapResults.executiveSummary
    });

    res.status(201).json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all analyses for current user
// @route   GET /api/analysis
const getUserAnalyses = async (req, res, next) => {
  try {
    const analyses = await SkillAnalysis.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: analyses.length,
      analyses
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single analysis by ID (enforces user ownership)
// @route   GET /api/analysis/:id
const getAnalysisById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const analysis = await SkillAnalysis.findById(id);
    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis record not found.'
      });
    }

    // Enforce authorization
    if (analysis.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only view your own analysis records.'
      });
    }

    res.status(200).json({
      success: true,
      analysis
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAnalysis,
  getUserAnalyses,
  getAnalysisById
};
