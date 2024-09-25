// index.js
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./Routes/users');
const customersRouter = require('./Routes/customers');
const carsRouter = require('./Routes/cars');
const bookingsRouter = require('./Routes/bookings');
const tasksRoute = require('./Routes/tasks');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/tasks', tasksRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
