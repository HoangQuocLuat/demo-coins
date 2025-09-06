const WebSocketClient = require("../../../pkg/ws/config");
const { createTicket, findTicketBySymbol, updateTicket } = require("../../../service/ticket");
const { createMarket } = require("../../../service/market");
const { createAsset } = require("../../../service/asset");
const { createPair } = require("../../../service/pair");
const { splitSymbol } = require('../../../utils/convert')

const url = "wss://fstream.binance.com/ws/!ticker@arr";

const wsClient = new WebSocketClient(url, async (tickers) => {
  console.log("Received tickers:", tickers.length, "symbols");

  for (const t of tickers) {
    await processTicketData(t);
    console.log(`Symbol: ${t.s}, LastPrice: ${t.c}, Volume: ${t.v}, Time: ${t.E}`);
  }
});

const processTicketData = async (ticket) => {
  //1. check ticket
  const existingTicket = await findTicketBySymbol(ticket.s);
  const ticketData = {
    symbol: ticket.s,
    event_time: ticket.E,
    last_price: ticket.c,
    price_change: ticket.p,
    price_change_percent: ticket.P,
    weighted_avg_price: ticket.w,
    volume: ticket.v,
    quote_volume: ticket.q,
    open_price: ticket.o,
    high_price: ticket.h,
    low_price: ticket.l,
    trade_count: ticket.n
  };

  if (!existingTicket) {
    // create ticket
    await createTicket({ ...ticketData })
    const { base, quote } = splitSymbol(ticket.s)
    const pair = await createPair({
      symbol: ticket.s,
      base_asset_id: base,
      quote_asset_id: quote
    })
    await createMarket({
      pair_id: pair.id,
      exchange: 'binance',
      market_type: 'futures'
    })
    await createAsset({
      symbol: base,
    })
  }
  if (existingTicket) {
    updateTicket(ticketData);
    console.log(`Updated ticket for symbol: ${ticket.s}`);
  }
}

const getTicket = () => {
  wsClient
}

module.exports = {
  getTicket
}