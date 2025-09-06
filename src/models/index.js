const {sequelize} = require("../pkg/sequelize/config");
const Assets = require('./Assets');
const Markets = require('./Markets');
const Pairs = require('./Pairs');
const Tickets = require('./Tickets');
const FundingRatesMinutely = require('./FundingRatesMinutely');

for (const m in sequelize.models) {
    console.log("Syncing model:", m);
    sequelize.models[m].sync();
}

module.exports = {
    Assets,
    Markets,
    Pairs,
    Tickets,
    FundingRatesMinutely
}