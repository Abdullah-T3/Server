// controllers/userController.js

const db = require('../config/db');

// Controller to validate user login
exports.validateUser = (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'SELECT password FROM users WHERE user_name = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            const storedPassword = results[0].password;

            if (password == storedPassword) {
                return res.json({ success: true, message: 'Login successful' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
};
