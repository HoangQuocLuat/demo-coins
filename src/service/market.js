const { Markets } = require('../models')
const createMarket = async (market) => {
    return Markets.create({...market})
}

module.exports = {
    createMarket
}