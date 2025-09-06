const { Pairs } = require('../models')
const createPair = async (pair) => {
    return Pairs.create({ ...pair })
}

module.exports = {
    createPair
}