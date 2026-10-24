const express = require('express');
const router = express.Router();
const { createAnalysis, getUserAnalyses, getAnalysisById } = require('../controllers/analysisController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createAnalysis);
router.get('/', getUserAnalyses);
router.get('/:id', getAnalysisById);

module.exports = router;
