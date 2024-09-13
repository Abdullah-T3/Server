const db = require('../config/db');
const bcrypt = require('bcrypt');

// Controller to validate user login
exports.validateUser = (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'SELECT password FROM users WHERE username = ?';

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        if (results.length > 0) {
            const storedPassword = results[0].password;

            // Use bcrypt to compare the hashed password
            bcrypt.compare(password, storedPassword, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ error: 'Error comparing passwords' });
                }

                if (isMatch) {
                    return res.json({ success: true, message: 'Login successful' });
                } else {
                    return res.status(401).json({ success: false, message: 'Invalid password' });
                }
            });
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    });
};
