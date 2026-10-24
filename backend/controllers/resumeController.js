const { parseResumeBuffer } = require('../services/resumeParserService');

// @desc    Analyze uploaded PDF resume
// @route   POST /api/resume/analyze
const analyzeResume = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No resume PDF file uploaded. Please upload a valid PDF document.'
      });
    }

    // Process uploaded file buffer in memory
    const parseResult = await parseResumeBuffer(req.file.buffer);

    res.status(200).json({
      success: true,
      data: parseResult
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeResume
};
