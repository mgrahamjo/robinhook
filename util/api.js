const request = require('./request'),
    serialize = require('./serialize');

function api(opts) {

    opts.headers = opts.headers || {};

    opts.headers.Accept = 'application/json';

    if (opts.method === 'POST') {

        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

    }

    if (opts.token) {

        opts.headers.Authorization = `Token ${opts.token}`;

    }

    console.log(`${opts.method.toLowerCase()} ${opts.url}...`);

    return request({
        host: 'api.robinhood.com',
        path: opts.url,
        method: opts.method,
        headers: opts.headers
    }, opts.data ? serialize(opts.data) : undefined);

}

api.post = (url, data, token) => api({
    url,
    data,
    token,
    method: 'POST'
});

api.get = (url, token) => api({
    url,
    token,
    method: 'GET'
});

module.exports = api;
