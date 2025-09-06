const WebSocketClient = require("../../pkg/ws/config");
const { initProducer, sendFundingRate } = require('../../pkg/kafka/producer/funding-rate.producer');

const url = "wss://fstream.binance.com/ws/!markPrice@arr@1s";
const TOPIC_FUNDING_RATE = 'funding_rate';

const getFundingRateByBinance = async () => {
  await initProducer();
  const wsClient = new WebSocketClient(url, async (fundingRate) => {
    console.log("Received tickers:", fundingRate.length, "symbols");

    // Tạo batch message
    const batchMessages = fundingRate.map(t => ({
      key: `${t.s}-binance`,
      value: JSON.stringify({
        exchange: 'binance',
        symbol: t.s,
        fundingRate: t.r,
        fundingTime: t.E,
        price: t.p
      })
    }));
    // Gửi batch
    await sendFundingRate(TOPIC_FUNDING_RATE, batchMessages);
    console.log(`Sent batch of ${batchMessages.length} messages to Kafka`);
  });
}

module.exports = {
  getFundingRateByBinance
}

