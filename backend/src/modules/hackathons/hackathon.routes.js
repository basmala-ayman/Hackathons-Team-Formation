const express = require('express');
const router = express.Router();
const hackathonController = require('./hackathon.controller');
const {protect , authorize} = require('../../middlewares/auth.middleware');

router.get('/', hackathonController.getAllHackathons);
router.get('/:id', hackathonController.getHackathonById);

// Admin routes
router.post('/', protect, authorize('admin'), hackathonController.createHackathon);
router.put('/:id', protect, authorize('admin'), hackathonController.updateHackathon);
router.delete('/:id', protect, authorize('admin'), hackathonController.deleteHackathon);

module.exports = router;