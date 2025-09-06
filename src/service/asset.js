const { Assets } = require('../models')
const createAsset = async (asset) => {
    return Assets.create({...asset})
}

module.exports = {
    createAsset
}