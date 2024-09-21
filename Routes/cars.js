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
  const { license_plate, brand, model, year_of_manufacture, odometer_reading, next_oil_change } = req.body;
  db.query(
    'INSERT INTO cars (license_plate, brand, model, year_of_manufacture, odometer_reading, next_oil_change) VALUES (?, ?, ?, ?, ?, ?)',
    [license_plate, brand, model, year_of_manufacture, odometer_reading, next_oil_change],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Car added');
    }
  );
});

// Update a car (Protected)
router.put('/:license_plate', authenticateToken, (req, res) => {
  const licensePlate = req.params.license_plate;
  const { brand, model, year_of_manufacture, odometer_reading, next_oil_change } = req.body;
  console.log(req.body);
  db.query(
    'UPDATE cars SET brand = ?, model = ?, year_of_manufacture = ?, odometer_reading = ?, next_oil_change = ? WHERE license_plate = ?',
    [brand, model, year_of_manufacture, odometer_reading, next_oil_change, licensePlate],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('Car updated');
    }
  );
});

// Delete a car (Protected)
router.delete('/:license_plate', authenticateToken, (req, res) => {
  const licensePlate = req.params.license_plate;
  db.query('DELETE FROM cars WHERE license_plate = ?', [licensePlate], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Car deleted');
  });
});

module.exports = router;
