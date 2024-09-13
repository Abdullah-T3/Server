
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define the route for validating the user
router.get('/validate-user', userController.validateUser);
// Routes/carRoutes.js
const express = require('express');

const carController = require('../controllers/carController');

// Define the route to get all cars
router.get('/', carController.getAllCars);


module.exports = router;