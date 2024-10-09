const express = require('express');
const getCryptoData = require('../services/getCryptoData');

const router = express.Router();

router.get('/stats', async (req, res) => {
    const coin = req.query.coin;

    // Mapping requested coins to their corresponding symbols in the database
    const coinSymbolMap = {
        bitcoin: 'btc',
        ethereum: 'eth',
        'matic-network': 'matic',
    };

    const symbol = coinSymbolMap[coin];

    if (!symbol) {
        return res.status(400).json({ message: 'Invalid coin requested. Use bitcoin, ethereum, or matic-network.' });
    }

    try {
        const data = await getCryptoData(symbol); // Fetch using the mapped symbol
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
