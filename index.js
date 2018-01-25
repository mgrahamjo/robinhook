const robinhood = require('./util/robinhood'),
    prompt = require('./util/prompt'),
    config = require('./util/config'),
    format = price => '$' + parseFloat(price).toFixed(2);

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

    let fundsAvailable = data.account.buying_power;

    console.log('\n------------------------------------\n');

    console.log(`Available funds: ${format(fundsAvailable)}\n`);

    const buys = data.quotes.results.map(quote => {

        const spend = data.account.buying_power * config[quote.symbol],
            price = quote.bid_price || quote.ask_price || quote.last_extended_hours_trade_price || quote.last_trade_price,
            quantity = Math.floor(spend / price);

        fundsAvailable -= price * quantity;

        return {
            price,
            quantity,
            quote
        };

    });

    buys.forEach(buy => {

        if (fundsAvailable > buy.price) {

            buy.quantity++;

            fundsAvailable -= buy.price;

        }

        console.log(`> Buying ${buy.quantity} shares of ${buy.quote.symbol} at ${format(buy.price)} per share`);

        if (buy.quantity > 0) {

            robinhood.buy(data.token, {
                account: data.account.url,
                symbol: buy.quote.symbol,
                instrument: buy.quote.instrument,
                price: buy.price,
                quantity: buy.quantity
            });

        }

    });

}).catch(error => {

    console.error(error);

    process.exit(1);

});
