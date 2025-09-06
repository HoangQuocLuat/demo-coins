const axios = require('axios');

async function getPairCount(category = 'spot') {
    const url = `https://api.bybit.com/v5/market/instruments-info?category=${category}`;
    try {
        const res = await axios.get(url);
        const data = res.data;

        if (data.retCode !== 0) {
            throw new Error(data.retMsg);
        }

        const pairs = data.result.list;
        console.log(`Danh sách cặp ${category}:`);
        // console.log(JSON.stringify(pairs, null, 2)); // in đầy đủ object
        console.log(`Số lượng cặp ${category}:`, pairs.length);

        return pairs.length;
    } catch (err) {
        console.error(`Lỗi khi lấy cặp ${category}:`, err.message);
        return 0;
    }
}

async function main() {
    await getPairCount('spot');
    await getPairCount('linear');
    await getPairCount('inverse');
}

main();
