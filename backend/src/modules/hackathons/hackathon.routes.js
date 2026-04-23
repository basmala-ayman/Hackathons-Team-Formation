const express = require('express');
const router = express.Router();

const hackathonController = require('./hackathon.controller');
const { protect, authorize } = require('../../middlewares/auth.middleware');
const validate = require('../../middlewares/validate.middleware');
const hackathonSchemas = require('./hackathon.validation');

// Public
router.get('/', hackathonController.getAllHackathons);
router.get('/:id', hackathonController.getHackathonById);

// // Admin
// router.post(
//   '/',
//   protect,
//   authorize('ADMIN'),
//   validate(hackathonSchemas.createHackathonSchema),
//   hackathonController.createHackathon
// );

// router.put(
//   '/:id',
//   protect,
//   authorize('ADMIN'),
//   validate(hackathonSchemas.updateHackathonSchema),
//   hackathonController.updateHackathon
// );

// router.delete(
//   '/:id',
//   protect,
//   authorize('ADMIN'),
//   validate(hackathonSchemas.deleteHackathonSchema),
//   hackathonController.deleteHackathon
// );

module.exports = router;