const express = require('express');
const cron = require('node-cron');
const connectDB = require('./config/db');
const saveCryptoData = require('./services/saveCryptoData');
const cryptoRoutes = require('./routes/cryptoRoutes');
const statsRoutes = require('./routes/statsRoutes');
const deviationRoutes = require('./routes/deviationRoutes');

require('dotenv').config();


const app = express();


connectDB();

app.use('/crypto', cryptoRoutes);
app.use('/', statsRoutes);
app.use('/d3', deviationRoutes)
// Schedule the background job to run every 2 hours
cron.schedule('0 */2 * * *', async () => {
    console.log('Fetching and saving crypto data...');
    await saveCryptoData();
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
