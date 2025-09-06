const WebSocket = require('ws');

// Function check RAM usage
const logMemory = () => {
  const used = process.memoryUsage();
  console.log(
    `RSS: ${(used.rss / 1024 / 1024).toFixed(2)} MB, HeapUsed: ${(used.heapUsed / 1024 / 1024).toFixed(2)} MB`
  );
};

// Binance WS
const binanceWS = new WebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice');

binanceWS.on('open', () => console.log('Connected to Binance WS'));
binanceWS.on('message', (data) => {
  const msg = JSON.parse(data);
  console.log('Binance Funding Rate:', msg.f, 'Timestamp:', msg.T);
  logMemory();
});

// Bybit WS
const bybitWS = new WebSocket('wss://stream.bybit.com/realtime_public');

bybitWS.on('open', () => {
  console.log('Connected to Bybit WS');
  bybitWS.send(JSON.stringify({ op: 'subscribe', args: ['funding.BTCUSDT'] }));
});

bybitWS.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.topic && msg.topic.startsWith('funding')) {
    console.log('Bybit Funding Rate:', msg.data[0].funding_rate, 'Timestamp:', msg.data[0].funding_time);
    logMemory();
  }
});

// OKX WS
const okxWS = new WebSocket('wss://ws.okx.com:8443/ws/v5/public');

okxWS.on('open', () => {
  console.log('Connected to OKX WS');
  const subscribe = { op: 'subscribe', args: [{ channel: 'funding-rate', instId: 'BTC-USD-SWAP' }] };
  okxWS.send(JSON.stringify(subscribe));
});

okxWS.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.event !== 'subscribe') {
    console.log('OKX Funding Rate:', msg.data[0].fundingRate, 'Timestamp:', msg.data[0].fundingTime);
    logMemory();
  }
});



