const api = require('./api');

module.exports = {

    login: credentials => api.post('/api-token-auth/', credentials),

    get: {

        accounts: token => api.get('/accounts/', token),

        quotes: (token, stocks) => api.get(`/quotes/?symbols=${stocks.map(s => s.symbol).join(',')}`, token)

    },

    buy: (token, opts) => api.post('/orders/', Object.assign(opts, {
        type: 'limit',
        time_in_force: 'gtc',
        trigger: 'immediate',
        side: 'buy'
    }), token)

};
