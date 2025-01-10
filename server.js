const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Import and connect to MongoDB first
require('./config/db');  // This could be your MongoDB connection file

// After database connection is set up, define routes and controllers
const cryptoRoutes = require('./routers/cryptoRoutes');
app.use('/api', cryptoRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
