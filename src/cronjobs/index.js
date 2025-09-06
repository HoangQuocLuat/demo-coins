const cron = require('node-cron');
const { getAllFundingRate } = require('../service/binance/futures/funding_rate');

async function runJob() {
  try {
    const data = await getAllFundingRate();
    console.log("Job finished. Number of items:", data.length);
  } catch (err) {
    console.error("Job error:", err.message);
  }
}

runJob();

cron.schedule('*/15 * * * * *', runJob);