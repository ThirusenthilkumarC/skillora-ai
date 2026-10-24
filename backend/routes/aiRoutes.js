const express = require('express');
const router = express.Router();
const { getRecommendations, getAIStatus } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

router.get('/status', getAIStatus);
router.post('/recommendations', protect, getRecommendations);

module.exports = router;
