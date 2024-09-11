// config/db.js

const mysql = require('mysql2');

// MySQL connection configuration
const db = mysql.createConnection({
  host: 'mysql-mywork.alwaysdata.net',
  user: 'mywork',      
  password: 'T3mia459', 
  database: 'mywork_cars',
  port: 3306
});

// Connect to the MySQL database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);  // Exit the process if the connection fails
  } else {
    console.log('Connected to the MySQL database');
  }
});

module.exports = db;
