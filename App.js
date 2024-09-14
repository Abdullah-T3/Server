// app.js
const express = require('express');
const app = express();
const carRoutes = require('./Routes/carRoutes');

// Middleware
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use('/api', carRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
