
const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define the route for validating the user
router.get('/validate-user', userController.validateUser);

module.exports = router;