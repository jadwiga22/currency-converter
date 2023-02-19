var http = require('http');
var request = require('request');
const NBP = "http://api.nbp.pl/api/exchangerates/rates/a/gbp/?format=json"

var GetExchangeRate = async () => {
    return new Promise((res, rej) => {
        request(NBP, (err, resp, body) => {
            if(err) {
                return rej(err);
            } else {
                return res(JSON.parse(body));
            }
        });
    });
}

module.exports = {GetExchangeRate};