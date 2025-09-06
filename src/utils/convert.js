const QUOTES = ["BTC", "USDT", "ETH", "BUSD", "USDC"];

function splitSymbol(symbol) {
  if (symbol.includes("_")) {
    return { base: "XXX", quote: "XXX" };
  }

  for (const quote of QUOTES) {
    if (symbol.endsWith(quote)) {
      return { base: symbol.slice(0, -quote.length), quote };
    }
  }

  return { base: "XXX", quote: "XXX" };
}

module.exports = {
  splitSymbol,
};
