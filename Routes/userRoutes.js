const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Define the route to validate user login
router.post('/validate', userController.validateUser);

module.exports = router;