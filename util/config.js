const read = require('fs').readFileSync,
    config = JSON.parse(read('./mike-config.json'));

let availableAllocation = 100;

config.allocatedStocks = config.stocks.filter(stock => {

    availableAllocation -= stock.allocation || 0;

    return stock.allocation;

});

const defaultAllocation = availableAllocation / (config.stocks.length - config.allocatedStocks.length);

config.stocks.forEach(stock => {

    config[stock.symbol] = (stock.allocation || defaultAllocation) / 100;

});

module.exports =  config;
