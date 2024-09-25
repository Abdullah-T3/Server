// routes/tasks.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Get all tasks (Protected)
router.get('/', authenticateToken, (req, res) => {
  db.query('SELECT task_id, task_title, task_description, deadline, is_completed, created_at, project_id FROM tasks', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new task (Protected)
router.post('/', authenticateToken, (req, res) => {
  const { task_title, task_description, deadline, is_completed, project_id } = req.body;
  db.query(
    'INSERT INTO tasks (task_title, task_description, deadline, is_completed, project_id) VALUES (?, ?, ?, ?, ?)',
    [task_title, task_description, deadline, is_completed, project_id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(201).send('Task added');
    }
  );
});

// Update a task (Protected)
router.put('/:task_id', authenticateToken, (req, res) => {
  const taskId = req.params.task_id;
  const { task_title, task_description, deadline, is_completed } = req.body;
  db.query(
    'UPDATE tasks SET task_title = ?, task_description = ?, deadline = ?, is_completed = ? WHERE task_id = ?',
    [task_title, task_description, deadline, is_completed, taskId],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.send('Task updated');
    }
  );
});

// Delete a task (Protected)
router.delete('/:task_id', authenticateToken, (req, res) => {
  const taskId = req.params.task_id;
  db.query('DELETE FROM tasks WHERE task_id = ?', [taskId], (err, results) => {
    if (err) return res.status(500).send(err);
    res.send('Task deleted');
  });
});

  // Update a task (Protected)
router.put('/:task_id', authenticateToken, (req, res) => {
    const taskId = req.params.task_id;
    const { task_title, task_description, deadline, is_completed } = req.body;
    db.query(
      'UPDATE tasks SET task_title = ?, task_description = ?, deadline = ?, is_completed = ? WHERE task_id = ?',
      [task_title, task_description, deadline, is_completed, taskId],
      (err, results) => {
        if (err) return res.status(500).send(err);
        res.send('Task updated');
      }
    );
  });
module.exports = router;
