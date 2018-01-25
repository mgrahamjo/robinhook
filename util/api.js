const request = require('./request'),
    serialize = require('./serialize');

function api(opts) {

    opts.headers = opts.headers || {};

    opts.headers.Accept = 'application/json';

    if (opts.token) {

        opts.headers.Authorization = `Token ${opts.token}`;

    }

    if (opts.data) {

        opts.data = serialize(opts.data);

        opts.headers['Content-Type'] = 'application/x-www-form-urlencoded';

        opts.headers['Content-Length'] = Buffer.byteLength(opts.data);

    }

    console.log(`${opts.method} ${opts.url}...`);

    return request({
        host: 'api.robinhood.com',
        path: opts.url + (opts.params ? '?' + serialize(opts.params) : ''),
        method: opts.method,
        headers: opts.headers
    }, opts.data);

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
