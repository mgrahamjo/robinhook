module.exports = data => {

    const ret = [];

    Object.keys(data).forEach(key => {

        ret.push(`${key}=${data[key]}`);

    });

    return ret.join('&');
  
};
