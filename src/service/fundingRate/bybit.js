const axios = require('axios');
const { getPair } = require("../../pkg/redis/service/pair");

const getFundingRate = async (symbol) => {
  try {
    const url = `https://api.bybit.com/v5/market/funding/history?category=linear&symbol=${symbol}`;
    console.log(`Fetching funding rate for ${symbol} from ${url}`);
    const res = await axios.get(url);
    if (res.data && res.data.result) {
      console.log(`Funding rate for ${symbol}:`, res.data.result[0]);
    } else {
      console.log(`No funding rate data for ${symbol}`);
    }
  } catch (err) {
    console.error(`Error fetching funding rate for ${symbol}:`, err.message);
  }
};

const fetchAllFundingRates = async () => {
  try {
    const allInstIds = await getPair("ex_default", "s_default");
    console.log("Total instId:", allInstIds.length);

    await Promise.all(
      allInstIds.map(symbol => getFundingRate(symbol))
    );

    console.log("All funding rates fetched successfully.");
  } catch (err) {
    console.error("Error fetching all funding rates:", err.message);
  }
};

fetchAllFundingRates();

setInterval(fetchAllFundingRates, 2 * 60 * 1000);
