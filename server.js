const express = require('express');
const mongoose = require('mongoose');
const { fetchCryptoData } = require('./backgroundJob');
const app = express();



// Import and connect to MongoDB first
require('./db');  // This could be your MongoDB connection file



// Schedule the background job to run every 2 hours
fetchCryptoData();

// After database connection is set up, define routes and controllers
const cryptoRoutes = require('./routers/cryptorouter')
app.use('/api', cryptoRoutes);


app.listen(5000, () => {
  console.log('Server running on port 5000');
});
