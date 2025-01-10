// backgroundJob.js
const cron = require('node-cron');
const axios = require('axios');
const Crypto = require('./models/cryptomodel') // Import the Crypto model to save data in DB

// Coingecko API URL
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

// Function to fetch data from CoinGecko
const fetchCryptoData = async () => {
  try {
    const response = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    // Extract the data for each coin
    const { bitcoin, 'matic-network': matic, ethereum } = response.data;

    // Prepare data to store in DB
    const cryptoData = [
      {
        coin: 'bitcoin',
        price: bitcoin.usd,
        marketCap: bitcoin.usd_market_cap,
        change24h: bitcoin.usd_24h_change,
      },
      {
        coin: 'matic-network',
        price: matic.usd,
        marketCap: matic.usd_market_cap,
        change24h: matic.usd_24h_change,
      },
      {
        coin: 'ethereum',
        price: ethereum.usd,
        marketCap: ethereum.usd_market_cap,
        change24h: ethereum.usd_24h_change,
      },
    ];

    // Save data in MongoDB
    await Crypto.insertMany(cryptoData);
    console.log('Data successfully saved to the database');
  } catch (error) {
    console.error('Error fetching or saving data:', error);
  }
};

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

module.exports = { fetchCryptoData };
