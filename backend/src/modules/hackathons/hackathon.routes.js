const express = require('express');
const router = express.Router();
const hackathonController = require('./hackathon.controller');
const { protect } = require('../../middlewares/auth.middleware');

router.get('/', hackathonController.getAllHackathons);

router.get('/names/list', hackathonController.getHackathonNames);

router.get('/:id', hackathonController.getHackathonById);

router.post('/create', protect, hackathonController.createHackathon);
router.put('/:id', protect, hackathonController.updateHackathon);
router.delete('/:id', protect, hackathonController.deleteHackathon);
router.get('/devpost/:devpostId', hackathonController.getHackathonByDevpostId);



module.exports = router;