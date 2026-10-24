const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const { analyzeResume } = require('../controllers/resumeController');
const { protect } = require('../middleware/auth');

router.post('/analyze', protect, upload.single('resume'), analyzeResume);

module.exports = router;
