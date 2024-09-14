const express = require('express');
const router = express.Router();
const carController = require('../Controllers/carController');

router.get('/cars', carController.getAllCars);
router.put('/cars/:plate_number', carController.updateCar);
module.exports = router;