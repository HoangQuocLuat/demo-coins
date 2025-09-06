const WebSocket = require("ws");

const url = "wss://ws.okx.com:8443/ws/v5/public";
const instId = "BTC-USD-SWAP";

let lastTimestamp = null;
let ws;

function connect() {
  ws = new WebSocket(url);

  ws.on("open", () => {
    console.log("Connected to OKX WS");
    const subscribeMsg = {
      op: "subscribe",
      args: [{ channel: "funding-rate", instId }],
    };
    ws.send(JSON.stringify(subscribeMsg));

    // Gửi ping thủ công mỗi 20s
    setInterval(() => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ event: "ping" }));
        // console.log("Sent ping");
      }
    }, 20000);
  });

  ws.on("message", (data) => {
    const msg = JSON.parse(data);

    // Trả lời nếu OKX gửi ping
    if (msg.event === "ping") {
      ws.send(JSON.stringify({ event: "pong" }));
      // console.log("Received ping → Sent pong");
      return;
    }

    if (msg.event === "subscribe") {
      console.log("Subscribed successfully");
      return;
    }

    if (msg.arg && msg.arg.channel === "funding-rate") {
      const d = msg.data[0];
      const fundingRate = d.fundingRate;
      const fundingTime = d.fundingTime;

      const now = Date.now();
      let delta = lastTimestamp ? ((now - lastTimestamp) / 1000).toFixed(2) : "N/A";
      lastTimestamp = now;

      console.log(
        `FundingRate: ${fundingRate}, FundingTime: ${fundingTime}, Δt: ${delta}s`
      );
    }
  });

  ws.on("close", () => {
    console.log("Connection closed. Reconnecting in 3s...");
    setTimeout(connect, 3000);
  });

  ws.on("error", (err) => {
    console.error("WS error:", err.message);
    ws.close();
  });
}

connect();
