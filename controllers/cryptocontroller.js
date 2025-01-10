// controllers/cryptoController.js
const Crypto = require('./../models/cryptomodel');

// Controller for /stats API route

// Function to get the latest stats for a given coin

const getCryptoStats = async (req, res) => {
    console.log(req.query);
  let { coin } = req.query;
  coin = coin ? coin.trim() : '';
  console.log(coin);


  if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
    return res.status(400).json({ error: 'Invalid or missing "coin" query parameter' });
  }

  try {
    const latestData = await Crypto.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestData) {
      return res.status(404).json({ error: 'No data found for the requested coin' });
    }

    return res.json({

      price: latestData.price,
      marketCap: latestData.marketCap,
      "24hChange": latestData.change24h
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCryptoDeviation = async (req, res) => {
    const { coin } = req.query;
  
    if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
      return res.status(400).json({ error: 'Invalid or missing "coin" query parameter' });
    }
  
    try {
      // Fetch the last 100 records for the requested coin
      const records = await Crypto.find({ coin }).sort({ timestamp: -1 }).limit(100);
  
      if (records.length === 0) {
        return res.status(404).json({ error: 'No records found for the requested coin' });
      }
  
      // Extract the price values
      const prices = records.map(record => record.price);
  
      // Calculate the standard deviation
      const mean = prices.reduce((acc, price) => acc + price, 0) / prices.length;
      const variance = prices.reduce((acc, price) => acc + Math.pow(price - mean, 2), 0) / prices.length;
      const standardDeviation = Math.sqrt(variance);
  
      return res.json({ deviation: standardDeviation });
      
    } catch (error) {
      console.error('Error calculating deviation:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

module.exports = { getCryptoStats , getCryptoDeviation};
