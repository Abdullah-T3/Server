// routes/users.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Register a new user
router.post(
  '/register',
  [
    body('username').isAlphanumeric(),
    body('password').isLength({ min: 6 }),
    body('user_type').isIn(['admin', 'user'])
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, user_type, project_id } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.query(
      'INSERT INTO users (username, password, user_type, project_id) VALUES (?, ?, ?, ?)',
      [username, hashedPassword, user_type, project_id],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('User created');
      }
    );
  }
);

// Login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0) return res.status(404).send('User not found');
  
      const user = results[0];
      const isValidPassword = bcrypt.compareSync(password, user.password);
  
      if (!isValidPassword) return res.status(401).send('Invalid credentials');
  
      // Include project_id in the JWT token
      const token = jwt.sign(
        { id: user.user_id, username: user.username, project_id: user.project_id }, 
        process.env.JWT_SECRET, 
        { expiresIn: '1h' }
      );
      
      res.json({ token });
    });
  });
// Check project_id route
router.get('/check-project', authenticateToken, (req, res) => {
    const { project_id } = req.query; // You can also use req.body if it's a POST request
    
    // Access the project_id from the token (req.user comes from the JWT verification)
    if (req.user.project_id === parseInt(project_id)) {
      return res.status(200).send('Project ID matches!');
    } else {
      return res.status(403).send('Project ID does not match.');
    }
  });
// Get all users (Protected route)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
