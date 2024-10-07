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
router.post('/', authenticateToken,  (req, res) => {
  const { 
    customer_name,
    customer_mobile,
    car_license_plate, 
    car_name, 
    rental_date,
    rental_amount, 
    rental_days, 
    car_km_at_rental 
  } = req.body;

  db.query(
      'INSERT INTO Orders (customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental],
      (err, results) => {
          if (err) return res.status(500).send(err);
          res.status(201).send('Order created');
      }
  );
});

router.put('/:id', authenticateToken, (req, res) => {
  
  const orderId = req.params.id;
  const { 
    customer_name,
    customer_mobile,
    car_license_plate, 
    car_name, 
    rental_date, 
    rental_amount,
    rental_days, 
    car_km_at_rental 
  } = req.body;
  
  console.log(req.body);  // For debugging purposes, prints the request body to the console
  
  const updateQuery = `
    UPDATE Orders 
    SET 
      customer_name = ?,
      customer_mobile = ?, 
      car_license_plate = ?, 
      car_name = ? ,
      rental_date = ?, 
      rental_amount = ?, 
      rental_days = ?, 
      car_km_at_rental = ? 
    WHERE order_id = ?
  `;
  
  db.query(
    updateQuery,
    [customer_name, customer_mobile, car_license_plate, car_name, rental_date, rental_amount, rental_days, car_km_at_rental, orderId],
    (err, results) => {
      if (err) {
        console.error('Error updating order:', err);  // Logs error in case of any issues with the query
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Order not found' });  // Handles case where orderId does not exist
      }

      res.status(200).json({ message: 'Order updated successfully' });
    }
  );
});

// Delete an order (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const orderId = req.params.id;
  db.query('DELETE FROM Orders WHERE order_id = ?', [orderId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Order deleted');
  });
});

module.exports = router;
