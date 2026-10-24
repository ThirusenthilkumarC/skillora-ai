const SkillAnalysis = require('../models/SkillAnalysis');
const { generateCareerAdvice, getAIConfig } = require('../services/aiService');

// @desc    Generate AI Career Recommendations
// @route   POST /api/ai/recommendations
const getRecommendations = async (req, res, next) => {
  try {
    const {
      analysisId,
      targetRole,
      currentSkills = [],
      missingSkills = [],
      improvementSkills = [],
      weeklyStudyHours,
      learningPreferences,
      experienceLevel
    } = req.body;

    let roleName = targetRole;
    let missing = missingSkills;
    let improve = improvementSkills;
    let current = currentSkills;

    // If analysisId is provided, retrieve analysis and verify ownership
    if (analysisId) {
      const analysis = await SkillAnalysis.findById(analysisId);
      if (analysis) {
        if (analysis.userId.toString() !== req.user._id.toString()) {
          return res.status(403).json({
            success: false,
            message: 'Unauthorized access to analysis record.'
          });
        }
        roleName = analysis.targetRole;
        missing = analysis.missingSkills;
        improve = analysis.improvementSkills;
      }
    }

    const hours = Number(weeklyStudyHours) || req.user.weeklyStudyHours || 10;
    const level = experienceLevel || req.user.experienceLevel || 'Student/Fresher';
    const preferences = learningPreferences || req.user.learningPreferences || [];

    const recommendations = await generateCareerAdvice({
      targetRole: roleName || req.user.targetRole || 'Full Stack Developer',
      currentSkills: current.length > 0 ? current : req.user.currentSkills,
      missingSkills: missing,
      improvementSkills: improve,
      experienceLevel: level,
      learningPreferences: preferences,
      weeklyStudyHours: hours
    });

    res.status(200).json({
      success: true,
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get AI service status and configuration info
// @route   GET /api/ai/status
const getAIStatus = async (req, res) => {
  const config = getAIConfig();
  res.status(200).json({
    success: true,
    provider: config.provider,
    isRealAIActive: config.provider !== 'none' && !!config.apiKey,
    model: config.model || null,
    message: config.provider !== 'none' && !!config.apiKey
      ? `Real AI Advisor active via ${config.provider} (${config.model})`
      : 'Rule-Based Intelligence Mode active (deterministic scoring & advice)'
  });
};

module.exports = {
  getRecommendations,
  getAIStatus
};
