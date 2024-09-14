const pool = require('../config/db');

function getAllCars(req, res) {
    pool.query('SELECT * FROM cars', (err, results) => {
        if (err) {
            console.error('Error fetching cars:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(results);
    });
}

module.exports = {
    getAllCars
};