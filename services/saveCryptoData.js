require('dotenv').config();  // Load environment variables
const axios = require('axios');
const CryptoData = require('../models/cryptoData');

const saveCryptoData = async () => {
    try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';

        // Fetch data for Bitcoin, Ethereum, and Matic from CoinGecko
        const response = await axios.get(apiUrl, {
            params: {
                vs_currency: 'usd',
                ids: 'bitcoin,ethereum,matic-network',
            },
        });

        const data = response.data;

        // Iterate over each coin and save data to MongoDB
        for (let coin of data) {
            const crypto = new CryptoData({
                name: coin.name,
                symbol: coin.symbol,
                current_price: coin.current_price,
                market_cap: coin.market_cap,
                change_24h: coin.price_change_percentage_24h
            });

            await crypto.save();
        }

        console.log('Crypto data saved successfully!');
    } catch (error) {
        console.error('Error fetching or saving crypto data:', error);
    }
};

module.exports = saveCryptoData;
