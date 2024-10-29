// index.js
const express = require('express');
const bodyParser = require('body-parser');
const usersRouter = require('./Routes/users');
const customersRouter = require('./Routes/customers');
const carsRouter = require('./Routes/cars');
const OrdersRoute = require('./Routes/ordersRoute');
const tasksRoute = require('./Routes/tasks');
const expensesRoute = require('./Routes/expenses');
const cors = require('cors');
const photoRoutes = require('./routes/photos');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/photos', photoRoutes);
app.use('/api/customers', customersRouter);
app.use('/api/cars', carsRouter);
app.use('/api/orders', OrdersRoute);
app.use('/api/tasks', tasksRoute);
app.use('/api/expenses', expensesRoute);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
