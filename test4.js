const WebSocket = require('ws');

const ws = new WebSocket('wss://stream.bybit.com/realtime_public');

ws.on('open', () => {
  ws.send(JSON.stringify({
    op: 'subscribe',
    args: ['funding.BTCUSDT']
  }));
});

ws.on('message', (data) => {
  const msg = JSON.parse(data);
  if (msg.topic === 'funding.BTCUSDT') {
    console.log('Funding Rate:', msg.data[0].fundingRate);
    console.log('Timestamp:', msg.data[0].fundingTime);
  }
});
