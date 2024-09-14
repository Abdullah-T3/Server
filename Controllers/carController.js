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

function updateCar(req, res) {
    const { plate_number } = req.params; 
    const { model, year, odometer_reading, next_oil_change } = req.body; 

    // SQL query to update the car
    const sql = 'UPDATE cars SET  model = ?, year_of_manufacture = ?, odometer_reading = ?, next_oil_change= ? WHERE plate_number = ?';
    const values = [ model, year, odometer_reading,next_oil_change, plate_number];

    pool.query(sql, values, (err, results) => {
        if (err) {
            console.error('Error updating car:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Car not found' });
        }
        res.status(200).json({ message: 'Car updated successfully' });
    });
}

module.exports = {
    getAllCars,
    updateCar
};