// app.js
const express = require('express');
const app = express();
const carRoutes = require('./Routes/carRoutes');
const userRoutes = require('./Routes/userRoutes');
// Middleware
app.use(express.json()); // To parse JSON bodies

// Use routes
app.use('/api', carRoutes);
// Import the userRoutes


// Use the userRoutes
app.use('/api', userRoutes);
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
