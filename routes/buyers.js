const express = require('express');
const router = express.Router();

const buyersController = require('../controllers/buyers');

router.get('/', buyersController.getAllBuyers);
router.get('/:id', buyersController.getSingleBuyer);
router.post('/', buyersController.createBuyer);
router.put('/:id', buyersController.updateBuyer);
router.delete('/:id', buyersController.deleteBuyer);

module.exports = router;