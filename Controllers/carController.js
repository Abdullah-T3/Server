// controllers/carController.js

const db = require('../config/db');

// Controller to get all cars
exports.getAllCars = (req, res) => {
    const query = 'SELECT * FROM cars';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching cars data:', err);
            return res.status(500).json({ error: 'Database query error' });
        }

        return res.json(results);
    });
};
