module.exports = {
    APIS: {
        BINANCE: {
            SPOTS: {
                BASE_URL: "https://api.binance.com/api/v3/ticker/24hr",
                // ENDPOINTS: {
                     
                // }

            },
            FUTURES: {
                BASE_URL: "https://fapi.binance.com",
                PREFIX:"/fapi/v1",
                ENDPOINTS: {
                    FUNDING_RATE:"/fundingRate",
                    LONG_SHORT_RATIO:"/futures/data/globalLongShortAccountRatio",
                    OPEN_INTEREST:"/openInterest",
                }
            }
        },
        OKX: {
        },

    },

    WEBSOCKET: {
        BINANCE: "wss://fstream.binance.com/ws/",
        OKX: "",
        BYBIT:"",
    },

    ARR_EXCHANGE: [
        'binance',
        'okx',
        'bybit'
    ]
}