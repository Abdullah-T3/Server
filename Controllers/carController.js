const pool = require('../config/db');

async function getAllCars(req, res) {
    try {
        const [results] = await pool.query('SELECT * FROM cars');
        res.json(results);
    } catch (err) {
        console.error('Error fetching cars:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateCar(req, res) {
    const { plate_number } = req.params;
    const { model, year, odometer_reading, next_oil_change } = req.body;

    const sql = 'UPDATE cars SET model = ?, year_of_manufacture = ?, odometer_reading = ?, next_oil_change = ? WHERE plate_number = ?';
    const values = [model, year, odometer_reading, next_oil_change, plate_number];

    try {
        const [results] = await pool.query(sql, values);
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully' });
    } catch (err) {
        console.error('Error updating car:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllCars,
    updateCar
};
