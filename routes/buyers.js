const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');

const buyersController = require('../controllers/buyers');

router.get('/', buyersController.getAll);

module.exports = router;