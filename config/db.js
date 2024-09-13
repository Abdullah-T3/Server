// config/db.js

const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
    host: 'mysql-mywork.alwaysdata.net',
    user: 'mywork',      // replace with your MySQL username
    password: 'T3mia459', // replace with your MySQL password
    database: 'mywork_cars' // replace with your database name
});

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

module.exports = db;
