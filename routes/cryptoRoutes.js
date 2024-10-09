const express = require('express');
const saveCryptoData = require('../services/saveCryptoData');
const router = express.Router();

router.post('/fetch-crypto', async (req, res) => {
    try {
        await saveCryptoData();
        res.json({ message: 'Data fetched and saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching or saving data' });
    }
});

module.exports = router;
