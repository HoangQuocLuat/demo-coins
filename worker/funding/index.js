const kafka = require('../pkg/kafka/config');
const { FundingRatesMinutely } = require('../../src/models');

const TOPIC_FUNDING_RATE = 'funding_rate';

const runFundingConsumer = async () => {
    const consumer = kafka.consumer({ groupId: process.env.KAFKA_USER_GROUP || 'coin-base' });
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC_FUNDING_RATE, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ message }) => {
            try {
                const data = JSON.parse(message.value.toString());
                const { exchange, symbol, fundingRate, fundingTime } = data;

                // --- Chuyển sang minuteKey (epoch ms, làm tròn xuống phút)
                const minuteKey = Math.floor(fundingTime / 60000) * 60000;
                const fundingRatePercent = Number((fundingRate * 100).toFixed(4));

                // --- Upsert: chỉ giữ 1 record/phút/symbol
                await FundingRatesMinutely.create({
                    exchange,
                    symbol,
                    fundingRate: fundingRatePercent,
                    fundingTime: minuteKey, // lưu theo phút
                    collectedAt: new Date(),
                });

                console.log(`[Consumer] Saved ${exchange}:${symbol} @ ${new Date(minuteKey).toISOString()} = ${fundingRate}`);
            } catch (err) {
                console.error("Error processing message:", err);
            }
        }
    });
};

module.exports = {
    runFundingConsumer
};
