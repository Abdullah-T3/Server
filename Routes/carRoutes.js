// Routes/carRoutes.js

const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Get all cars (GET method to retrieve all cars from the database)
router.get('/', carController.getAllCars);

module.exports = router;
