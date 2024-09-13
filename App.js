// app.js

const express = require('express');
const fs = require('fs');
const util = require('util');
const userRoutes = require('./Routes/userRoutes');  // Import the user routes
const carRoutes = require('./Routes/carRoutes');    // Import the car routes

// Setup logging to a file
const log_file = fs.createWriteStream(__dirname + '/debug.log', {flags: 'w'});
const log_stdout = process.stdout;
console.log = function(d) { 
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

// Create an Express app
const app = express();
app.use(express.json());

// Set up routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);  // Add the cars route

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
