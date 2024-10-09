const CryptoData = require('../models/cryptoData');

// Function to calculate the standard deviation of an array of numbers
const calculateStandardDeviation = (prices) => {
    const mean = prices.reduce((sum, price) => sum + price, 0) / prices.length;
    const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
    const variance = squaredDiffs.reduce((sum, diff) => sum + diff, 0) / squaredDiffs.length;
    return Math.sqrt(variance);
};

const getDeviation = async (coin) => {
    try {
        const records = await CryptoData.find({ symbol: coin })
            .sort({ timestamp: -1 }) // Sort by latest timestamp
            .limit(100);              // Limit to the last 100 records

        if (records.length === 0) {
            throw new Error('No records found for the requested coin');
        }

        const prices = records.map(record => record.current_price);
        const deviation = calculateStandardDeviation(prices);
        return { deviation };
    } catch (error) {
        throw error;
    }
};

module.exports = getDeviation;
