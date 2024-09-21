const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your MySQL connection pool configured here

// 1. Add a New Task (POST request)
router.post('/add', async (req, res) => {
  const { task_title, task_description, deadline } = req.body;

  // Validate input
  if (!task_title || !task_description || !deadline) {
    return res.status(400).json({ message: 'Task title, description, and deadline are required.' });
  }

  try {
    const query = 'INSERT INTO tasks (task_title, task_description, deadline) VALUES (?, ?, ?)';
    const [result] = await db.query(query, [task_title, task_description, deadline]);

    res.status(201).json({ message: 'Task added successfully.', task_id: result.insertId });
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 2. Get All Tasks (GET request)
router.get('/', async (req, res) => {
  try {
    const [tasks] = await db.query('SELECT * FROM tasks ORDER BY deadline ASC');
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 3. Update a Task (PUT request)
router.put('/update/:task_id', async (req, res) => {
  const { task_id } = req.params;
  const { task_title, task_description, deadline, is_completed } = req.body;

  try {
    const query = 'UPDATE tasks SET task_title = ?, task_description = ?, deadline = ?, is_completed = ? WHERE task_id = ?';
    const [result] = await db.query(query, [task_title, task_description, deadline, is_completed, task_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task updated successfully.' });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 4. Delete a Task (DELETE request)
router.delete('/delete/:task_id', async (req, res) => {
  const { task_id } = req.params;

  try {
    const query = 'DELETE FROM tasks WHERE task_id = ?';
    const [result] = await db.query(query, [task_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
