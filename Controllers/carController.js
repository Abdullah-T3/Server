// controllers/carController.js
const db = require('../config/db');  // Import the MySQL connection pool

// Controller function to get all cars
exports.getAllCars = async (req, res) => {
  try {
    // Query to fetch all data from the cars table
    const [rows] = await db.query('SELECT * FROM cars');
    
    // Return the result as JSON
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cars data:', err);
    res.status(500).json({ error: 'Database query error' });
  }
};
