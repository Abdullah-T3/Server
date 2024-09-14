const express = require('express');
const router = express.Router();
const carController = require('../Controllers/carController');

router.get('/cars', carController.getAllCars);

module.exports = router;