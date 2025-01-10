// server.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cryptoRoutes = require('./routers/cryptorouter')
const { fetchCryptoData } = require('./backgroundJob');  // Import the background job

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 15000, // Increase the timeout to 15 seconds
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log("Error connecting to MongoDB:", err));

// Start the background job
fetchCryptoData();  // Run the job once when the server starts

// Use crypto routes
app.use('/api', cryptoRoutes);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
