// routes/bookings.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all bookings (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM bookings', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a booking (Protected)
router.post('/', authenticateToken, (req, res) => {
  const { booking_date, pickup_date, return_date, car_id, customer_id, description, rental_days, rental_amount } = req.body;
  db.query(
      'INSERT INTO bookings (booking_date, pickup_date, return_date, car_id, customer_id, description, rental_days, rental_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [booking_date, pickup_date, return_date, car_id, customer_id, description, rental_days, rental_amount],
      (err, results) => {
          if (err) return res.status(500).send(err);
          res.status(201).send('Booking created');
      }
  );
});


// Update a booking (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  const { booking_date, pickup_date, plate_number, customer_number, description, rental_days, rental_amount } = req.body;
  db.query(
    'UPDATE bookings SET booking_date = ?, pickup_date = ?, plate_number = ?, customer_number = ?, description = ?, rental_days = ?, rental_amount = ? WHERE booking_id = ?',
    [booking_date, pickup_date, plate_number, customer_number, description, rental_days, rental_amount, bookingId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('Booking updated');
    }
  );
});

// Delete a booking (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const bookingId = req.params.id;
  db.query('DELETE FROM bookings WHERE booking_id = ?', [bookingId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Booking deleted');
  });
});

module.exports = router;
