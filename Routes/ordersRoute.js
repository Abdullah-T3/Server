const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all orders (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Orders', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new order (Protected)
router.post('/', authenticateToken, async (req, res) => {
  const { 
    customer_name, 
    customer_mobile, 
    car_license_plate, 
    car_name, 
    rental_date, 
    rental_days, 
    rental_amount, 
    car_km_at_rental, 
    image_url 
  } = req.body;

  try {
    // Ensure image URL is provided


    // Log the received image URL for debugging
    console.log('Received image URL:', image_url);

    // Save the order with the provided image URL
    db.query(
      'INSERT INTO Orders (customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, image_url],
      (err, results) => {
        if (err) {
          console.error('Database error:', err); // Log the database error
          return res.status(500).send(err);
        }
        res.status(201).send('Order created');
      }
    );
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Order creation failed' });
  }
});

// Update an order (Protected)
router.put('/:id', authenticateToken, async (req, res) => {
  const orderId = req.params.id;
  const { 
    customer_name, 
    customer_mobile, 
    car_license_plate, 
    car_name, 
    rental_date, 
    rental_days, 
    rental_amount, 
    car_km_at_rental, 
    image_url 
  } = req.body;

  try {
    // Prepare the fields for updating
    const fieldsToUpdate = [
      'customer_name = ?',
      'customer_mobile = ?',
      'car_license_plate = ?',
      'car_name = ?',
      'rental_date = ?',
      'rental_days = ?',
      'rental_amount = ?',
      'car_km_at_rental = ?',
      'image_url = ?'
    ];
    
    // Build the SQL query
    const sql = `UPDATE Orders SET ${fieldsToUpdate.join(', ')} WHERE order_id = ?`;
    const values = [
      customer_name, 
      customer_mobile, 
      car_license_plate, 
      car_name, 
      rental_date, 
      rental_days, 
      rental_amount, 
      car_km_at_rental, 
      image_url, 
      orderId
    ];

    // Update the order in the database
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error('Database error:', err); // Log the database error
        return res.status(500).send(err);
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Order not found' });
      }
      res.send('Order updated');
    });
    
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ error: 'Order update failed' });
  }
});

// Delete an order (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  db.query('DELETE FROM Orders WHERE order_id = ?', [orderId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.send('Order deleted');
  });
});

module.exports = router;
