const express = require('express');
const router = express.Router();
const {
  createRoadmap,
  getUserRoadmaps,
  getRoadmapById,
  updateTaskStatus
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', createRoadmap);
router.get('/', getUserRoadmaps);
router.get('/:id', getRoadmapById);
router.patch('/:id/tasks/:taskId', updateTaskStatus);

module.exports = router;
