const kafka = require('../config');

const producer = kafka.producer();

const initProducer = async () => {
  await producer.connect();
};

const sendFundingRate = async (topic, message) => {
  await producer.send({
    topic,
    messages: message,
  });
  // await producer.disconnect();
};

module.exports = { initProducer, sendFundingRate };
