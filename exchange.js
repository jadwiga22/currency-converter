var http = require('http');
var request = require('request');
const NBP = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json"

/**
 * Returns Promise, which contains current exchange rate fetched from NBP website.
 */

var GetExchangeRate = async () => {
    return new Promise((res, rej) => {
        request(NBP, (err, resp, body) => {
            if(err) {
                return rej(err);
            } else {
                return res(JSON.parse(body).rates[0].mid);
            }
        });
    });
}

module.exports = {GetExchangeRate};