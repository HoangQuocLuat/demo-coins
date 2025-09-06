const { Kafka } = require('kafkajs');

const brokers = process.env.KAFKA_BROKERS
  ? process.env.KAFKA_BROKERS.split(',')
  : ['localhost:29092'];

const clientId = process.env.KAFKA_CLIENT_ID || 'coin-base-app';

const kafka = new Kafka({
  clientId,
  brokers,
  connectionTimeout: 3000,
  requestTimeout: 25000,
  retry: {
    retries: 5,
  },
});

module.exports = kafka;
