// Routes/carRoutes.js

const express = require('express');
const router = express.Router();
const carController = require('../Controllers/carController');

// Get all cars (GET method to retrieve all cars from the database)
router.get('/', carController.getAllCars);

module.exports = router;
