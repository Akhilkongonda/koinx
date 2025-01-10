// routes/cryptoRoutes.js
const express = require('express');

const { getCryptoStats,getCryptoDeviation } = require('./../controllers/cryptocontroller');

const router = express.Router();



// Define the /stats route
router.get('/stats', getCryptoStats);
router.get('/deviation', getCryptoDeviation);

module.exports = router;
