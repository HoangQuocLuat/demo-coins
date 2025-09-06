const redisQuery = require('../query')
const { Pairs } = require('../../../models')
const PREFIX_PAIR = 'funding:{exchange}:{symbol_type}'

const getPair = async (exchange, symbol_type, up = false) => {
    const key = PREFIX_PAIR.replace('{exchange}', exchange).replace('{symbol_type}', symbol_type)

    if (!up) {
        const cacheArr = await redisQuery.sMembers(key);
        if (cacheArr.length) return cacheArr;
    }

    const pairs = await Pairs.findAll({
        where: { is_del: 0 },
        attributes: ['base_asset_id', 'quote_asset_id']
    });

    let allPairs = pairs.map(p => {
        if (exchange === 'okx' && symbol_type === 'SWAP') {
            return `${p.base_asset_id}-${p.quote_asset_id}-SWAP`;
        }
        return `${p.base_asset_id}${p.quote_asset_id}`;
    });

    if (allPairs.length) {
        await redisQuery.sAdd(key, allPairs);
    }

    return allPairs
}

module.exports = {
    getPair
}
