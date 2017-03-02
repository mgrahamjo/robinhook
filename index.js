const robinhood = require('./util/robinhood'),
    prompt = require('./util/prompt'),
    config = require('./util/config'),
    format = price => '$' + parseFloat(price).toFixed(2);

// function print(obj) { console.log(JSON.stringify(obj, null, '\t')); }

prompt('username: ').then(username => 

    prompt('password: ').then(password => 

        robinhood.login({
            username,
            password
        })

    )

).then(data => 

    robinhood.get.accounts(data.token)
        .then(accounts => Object.assign(data, {
            account: accounts.results.filter(account => account.account_number === config.account)[0]
        }))

).then(data => 

    robinhood.get.quotes(data.token, config.stocks)
        .then(quotes => Object.assign(data, {quotes}))

).then(data => {

    const fundsAvailable = data.account.buying_power;

    console.log(`\n------------------------------------\n`);

    console.log(`Available funds: ${format(fundsAvailable)}\n`);

    data.quotes.results.forEach(quote => {

        const spend = fundsAvailable * config[quote.symbol],
            price = quote.last_extended_hours_trade_price || quote.last_trade_price || quote.ask_price,
            quantity = Math.floor(spend / price);

        console.log(`> Buying ${quantity} shares of ${quote.symbol} at ${format(price)} per share`);

        if (quantity > 0) {

            robinhood.buy({
                account: config.account,
                symbol: quote.symbol,
                instrument: quote.instrument,
                quantity
            });

        }

    });

}).catch(error => {

    console.error(error);

    process.exit(1);

});
