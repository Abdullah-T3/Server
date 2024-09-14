// Controllers/userController.js

const db = require('../config/db');
const bcrypt = require('bcrypt');

// Controller to validate user login
exports.validateUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Query to get the stored hashed password for the given username
        const query = 'SELECT password FROM users WHERE username = ?';
        const [results] = await db.query(query, [username]);

        if (results.length > 0) {
            const storedPassword = results[0].password;
            console.log(storedPassword);
            // Compare the provided password with the stored hashed password

            if (password === storedPassword) {
                return res.json({ success: true, message: 'Login successful' });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
    } catch (err) {
        console.error('Error validating user:', err);
        res.status(500).json({ error: 'Error validating user' });
    }
};
