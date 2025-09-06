const WebSocket = require("ws");

class WebSocketClient {
    /**
     * @param {string} url WebSocket URL
     * @param {function} onMessage callback khi nhận dữ liệu
     */
    constructor(url, onMessage) {
        this.url = url;
        this.onMessage = onMessage;
        this.openHandlers = [];
        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.ws.on("open", () => {
            console.log(`WebSocket connected: ${this.url}`);
        });

        this.ws.on("message", (data) => {
            try {
                const jsonData = JSON.parse(data);
                this.onMessage(jsonData);
            } catch (err) {
                console.error("Parse error:", err);
            }
        });

        this.ws.on("close", () => {
            console.log(`WebSocket disconnected: ${this.url}`);
            setTimeout(() => this.connect(), 1000);
        });

        this.ws.on("error", (err) => {
            console.error("WebSocket error:", err);
        });

        this.ws.on("open", () => {
            console.log(`WebSocket connected: ${this.url}`);
            this.openHandlers.forEach((cb) => cb());
        });
    }

    onOpen(cb) {
        console.log("onOpen callback called")
        this.openHandlers.push(cb);
    }

    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(data));
        }
    }

    close() {
        this.ws.close();
    }
}

module.exports = WebSocketClient;
