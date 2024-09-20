// routes/cars.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all cars (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM cars', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a car (Protected)
router.post('/', authenticateToken, (req, res) => {
  const { plate_number, brand, model, year, odometer, next_oil_change } = req.body;
  db.query(
    'INSERT INTO cars (plate_number, brand, model, year, odometer, next_oil_change) VALUES (?, ?, ?, ?, ?, ?)',
    [plate_number, brand, model, year, odometer, next_oil_change],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Car added');
    }
  );
});

// Update a car (Protected)
router.put('/:plate_number', authenticateToken, (req, res) => {
  const plateNumber = req.params.plate_number;
  const { brand, model, year, odometer, next_oil_change } = req.body;
  db.query(
    'UPDATE cars SET brand = ?, model = ?, year = ?, odometer = ?, next_oil_change = ? WHERE plate_number = ?',
    [brand, model, year, odometer, next_oil_change, plateNumber],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('Car updated');
    }
  );
});

// Delete a car (Protected)
router.delete('/:plate_number', authenticateToken, (req, res) => {
  const plateNumber = req.params.plate_number;
  db.query('DELETE FROM cars WHERE plate_number = ?', [plateNumber], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Car deleted');
  });
});

module.exports = router;
