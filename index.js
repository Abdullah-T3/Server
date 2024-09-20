// index.js
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const customersRouter = require('./Routes/customers');
const carsRouter = require('./Routes/cars');
const bookingsRouter = require('./Routes/bookings');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/bookings', bookingsRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
