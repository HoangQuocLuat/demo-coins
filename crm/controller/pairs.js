const { getPair } = require('../../src/pkg/redis/service/pair')

const upPairs = ( req ) => {
    const { exchange, symbol_type} = req.query;
    return getPair( exchange, symbol_type, true )
}

module.exports = {
    upPairs
}