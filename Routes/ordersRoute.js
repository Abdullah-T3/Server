// Add a new order (Protected)
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth.js');
const db = require('../config/db');
router.post('/', authenticateToken, (req, res) => {
  const { 
    customer_name, customer_mobile, car_license_plate, car_name, 
    rental_date, rental_amount, rental_days, car_km_at_rental 
  } = req.body;

  if (!customer_mobile || customer_mobile.length < 10) {
    return res.status(400).json({ error: 'Invalid customer mobile number' });
  }

  db.query(
    'INSERT INTO Orders (customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental],
    (err, results) => {
      if (err) {
        console.error('Database insertion error:', err);
        return res.status(500).json({ error: 'Failed to create order' });
      }
      res.status(201).send('Order created');
    }
  );
});

router.put('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  const { 
    customer_name, customer_mobile, car_license_plate, car_name, 
    rental_date, rental_amount, rental_days, car_km_at_rental 
  } = req.body;

  if (!customer_mobile || customer_mobile.length < 10) {
    return res.status(400).json({ error: 'Invalid customer mobile number' });
  }

  const updateQuery = `
    UPDATE Orders 
    SET customer_name = ?, customer_mobile = ?, car_license_plate = ?, 
        car_name = ?, rental_date = ?, rental_amount = ?, 
        rental_days = ?, car_km_at_rental = ? 
    WHERE order_id = ?
  `;

  db.query(
    updateQuery,
    [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, orderId],
    (err, results) => {
      if (err) {
        console.error('Database update error:', err);
        return res.status(500).json({ error: 'Failed to update order' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order updated successfully' });
    }
  );
});
