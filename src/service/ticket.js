const { Tickets } = require('../models')
const createTicket = async (asset) => {
    return Tickets.create({ ...asset })
}

const findTicketBySymbol = async (symbol) => {
    return Tickets.findOne({ where: { symbol } });
}

const updateTicket = async (ticket) => {
    const { symbol, ...rest } = ticket;
    return Tickets.update(
        { ...rest },
        { where: { symbol } }
    );
};


module.exports = {
    createTicket,
    findTicketBySymbol,
    updateTicket
}
