// config/db.js
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'mysql-mywork.alwaysdata.net',
  user: 'mywork',      
  password: 'T3mia459', 
  database: 'mywork_cars',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Handle database connection errors
pool.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was lost, reconnecting...');
    // Optional: Reconnection logic could go here if you need it
  }
});

// Export the promise-based pool
const promisePool = pool.promise();
module.exports = promisePool;
