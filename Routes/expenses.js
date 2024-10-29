const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all expenses (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT * FROM Expenses', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new expense (Protected)
router.post('/', authenticateToken, (req, res) => {
  const { 
    project_id,
    customer_name,
    description, 
    car_details, 
    expenses_date, 
    cost, 
    remaining 
  } = req.body;

  db.query(
    'INSERT INTO Expenses (project_id, customer_name, description, car_details, expenses_date, cost, remaining) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [project_id, customer_name, description, car_details, expenses_date, cost, remaining],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Expense created');
    }
  );
});

// Update an expense (Protected)
router.put('/:id', authenticateToken, (req, res) => {
  const expenseId = req.params.id;
  const { 
    project_id,
    customer_name,
    description, 
    car_details, 
    expenses_date, 
    cost, 
    remaining 
  } = req.body;

  const updateQuery = `
    UPDATE Expenses 
    SET 
      project_id = ?,
      customer_name = ?, 
      description = ?, 
      car_details = ?, 
      expenses_date = ?, 
      cost = ?, 
      remaining = ? 
    WHERE expenses_id = ?
  `;

  db.query(
    updateQuery,
    [project_id, customer_name, description, car_details, expenses_date, cost, remaining, expenseId],
    (err, results) => {
      if (err) return res.status(500).send(err);

      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Expense not found' });
      }

      res.status(200).json({ message: 'Expense updated successfully' });
    }
  );
});

// Delete an expense (Protected)
router.delete('/:id', authenticateToken, (req, res) => {
  const expenseId = req.params.id;
  db.query('DELETE FROM Expenses WHERE expenses_id = ?', [expenseId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Expense deleted');
  });
});

module.exports = router;
