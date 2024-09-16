// app.js
const express = require('express');
const app = express();
const carRoutes = require('./Routes/carRoutes');
const userRoutes = require('./Routes/userRoutes');
const notesRoutes = require('./Routes/notesRoutes');
// Middleware
app.use(express.json()); // To parse JSON bodies


app.use('/api/users', userRoutes);

app.use('/api', carRoutes);

app.use('/api', notesRoutes);


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
