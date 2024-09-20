// routes/customers.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all customers (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Create a customer (Protected)
router.post('/', authenticateToken, (req, res) => {
  const { customer_name, id_number, address, landline, reference_number } = req.body;
  db.query(
    'INSERT INTO customers (customer_name, id_number, address, landline, reference_number) VALUES (?, ?, ?, ?, ?)',
    [customer_name, id_number, address, landline, reference_number],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Customer created');
    }
  );
});

// Update customer (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  const customerId = req.params.id;
  const { customer_name, id_number, address, landline, reference_number } = req.body;
  db.query(
    'UPDATE customers SET customer_name = ?, id_number = ?, address = ?, landline = ?, reference_number = ? WHERE customer_id = ?',
    [customer_name, id_number, address, landline, reference_number, customerId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('Customer updated');
    }
  );
});

// Delete a customer (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const customerId = req.params.id;
  db.query('DELETE FROM customers WHERE customer_id = ?', [customerId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Customer deleted');
  });
});

module.exports = router;
