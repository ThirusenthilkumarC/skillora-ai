const express = require('express');
const router = express.Router();
const { getAnalysisReport } = require('../controllers/reportController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/:analysisId', getAnalysisReport);

module.exports = router;
