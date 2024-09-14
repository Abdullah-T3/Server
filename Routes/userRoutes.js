const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Route to validate user login
router.post('/validate', userController.validateUser);

module.exports = router;