const CryptoData = require('../models/cryptoData');

const getCryptoData = async (coin) => {
    try {
        const latestData = await CryptoData.findOne({ symbol: coin }).sort({ timestamp: -1 });
        console.log("Latest Data:", latestData); // Log latest data

        if (!latestData) {
            throw new Error('No data found for the requested coin');
        }

        return {
            price: latestData.current_price,
            marketCap: latestData.market_cap,
            "24hChange": latestData.change_24h,
        };
    } catch (error) {
        console.error("Error fetching data:", error); // Log the error
        throw error;
    }
};
module.exports = getCryptoData;
