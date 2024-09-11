const db = require('../config/db');  // Import the connection pool

exports.validateUser = async (req, res) => {
  const { username, password } = req.query;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const [rows] = await db.query('SELECT password FROM users WHERE user_name = ?', [username]);
    
    if (rows.length > 0) {
      const storedPassword = rows[0].password;

      if (password === storedPassword) {
        return res.json({ success: true, message: 'Login successful' });
      } else {
        return res.status(401).json({ success: false, message: 'Invalid password' });
      }
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    console.error('Error executing query:', err);
    return res.status(500).json({ error: 'Database query error' });
  }
};
