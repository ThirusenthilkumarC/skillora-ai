const User = require('../models/User');
const SkillAnalysis = require('../models/SkillAnalysis');
const LearningRoadmap = require('../models/LearningRoadmap');

// @desc    Get user profile
// @route   GET /api/users/profile
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile & skills
// @route   PATCH /api/users/profile
const updateProfile = async (req, res, next) => {
  try {
    const {
      name,
      targetRole,
      currentSkills,
      experienceLevel,
      learningPreferences,
      weeklyStudyHours,
      bio
    } = req.body;

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    if (name) user.name = name.trim();
    if (targetRole) user.targetRole = targetRole;
    if (Array.isArray(currentSkills)) user.currentSkills = currentSkills;
    if (experienceLevel) user.experienceLevel = experienceLevel;
    if (Array.isArray(learningPreferences)) user.learningPreferences = learningPreferences;
    if (weeklyStudyHours !== undefined) user.weeklyStudyHours = Number(weeklyStudyHours);
    if (bio !== undefined) user.bio = bio;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
        experienceLevel: user.experienceLevel,
        weeklyStudyHours: user.weeklyStudyHours,
        currentSkills: user.currentSkills,
        learningPreferences: user.learningPreferences,
        bio: user.bio,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user account and all associated records
// @route   DELETE /api/users/account
const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Delete user's skill analyses and roadmaps
    await SkillAnalysis.deleteMany({ userId });
    await LearningRoadmap.deleteMany({ userId });
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: 'Account and associated analysis records deleted successfully.'
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  deleteAccount
};
