const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Validate user (GET method for login)
router.get('/validate-user', userController.validateUser);

module.exports = router;