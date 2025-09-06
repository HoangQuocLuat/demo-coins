const WebSocketClient = require("../../pkg/ws/config");
const { getPair } = require("../../pkg/redis/service/pair");
const { initProducer, sendFundingRate } = require('../../pkg/kafka/producer/funding-rate.producer');

const url = "wss://ws.okx.com:8443/ws/v5/public";
const BATCH_SIZE = 500;

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const getFundingRateByOKX = async () => {
  await initProducer();
  const allInstIds = await getPair("okx", "SWAP");
  console.log("Total instId:", allInstIds.length);

  const batches = chunkArray(allInstIds, BATCH_SIZE);
  console.log("Total connections to open:", batches.length);

  batches.forEach((batch, idx) => {
    const wsClient = new WebSocketClient(url, async (msg) => {
      try {
        if (msg.event === "subscribe") {
          console.log(`Conn ${idx}: Subscribed ${msg.args?.length} symbols`);
          return;
        }

        if (msg.arg && msg.arg.channel === "funding-rate") {
          const batchMessages = msg.data.map(d => ({
            key: `${d.instId}-okx`,
            value: JSON.stringify({
              exchange: 'okx',
              symbol: d.instId,
              fundingRate: d.fundingRate,
              fundingTime: d.fundingTime
            })
          }));
          await sendFundingRate('funding_rate', batchMessages);
          console.log(`Conn ${idx} sent batch of ${batchMessages.length} messages to Kafka`);
        }
      } catch (err) {
        console.error(`Conn ${idx} error:`, err);
      }
    });

    wsClient.onOpen(() => {
      const subscribeMsg = {
        op: "subscribe",
        args: batch.map((instId) => ({
          channel: "funding-rate",
          instId
        }))
      };

      console.log(`Conn ${idx} subscribing ${batch.length} instIds`);
      wsClient.send(subscribeMsg);
    });
  });
}

module.exports = {
  getFundingRateByOKX
}
