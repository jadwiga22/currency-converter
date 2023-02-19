var assert = require('assert');
var parser = require('../parser.js');
var exchange = require('../exchange.js');

describe('Parsing', function () {
    describe('#MatchesNumberPattern()', function () {
        const tests = [
            {arg: "38748.23", expected: true},
            {arg: "76347s.3874", expected: false},
            {arg: "", expected: false},
            {arg: "893748", expected: true},
            {arg: ".398478", expected: false},
            {arg: "23648.234a", expected: false},
            {arg: "3879.", expected: false},
            {arg: "384947.39478.323", expected: false},
            {arg: ".", expected: false}
        ];
        tests.forEach((test) => {
            it('correctly matches ' + test.arg, function () {
                var res = parser.MatchesNumberPattern(test.arg);
                assert.equal(res, test.expected);
            });
        });
    });

    describe('#ToNumber()', function () {
        const tests = [
            {args: ["237483", 1, 10], expected: 237483},
            {args: ["00238743", 1, 10], expected: 238743},
            {args: ["2387", 1/10, 1/10], expected: 0.7832}
        ];

        tests.forEach((test) => {
            it('correctly converts ' + test.args[0] + ' with base ' + test.args[1] + ' and multiplier ' + test.args[2], function () {
                var res = parser.ToNumber.apply(null, test.args);
                assert.equal(res, test.expected);
            });
        });
    });

    describe('#Parser()', function () {
        const tests = [
            {arg: "237483", expected: 237483},
            {arg: "00238743", expected: 238743},
            {arg: "3894.34786", expected: 3894.34786},
            {arg: "0.329743", expected: 0.329743},
            {arg: ".0823", expected: false},
            {arg: "48732.", expected: false},
            {arg: ".", expected: false}, 
            {arg: "", expected: false},
            {arg: 328479, expected: false},
            {arg: {}, expected: false},
            {arg: {foo: "foo", bar: "bar"}, expected: false}
        ];

        tests.forEach((test) => {
            it('correctly parses ' + test.arg, function () {
                var res = parser.Parser(test.arg);
                assert.equal(res, test.expected);
            });
        });
    });
})

describe('Exchange rates', function () {
    describe('#GetExchangeRate()', function () {
        it('correctly fetches exchange rate', async function () {
            var res = await exchange.GetExchangeRate();
            assert.equal(typeof res.rates[0].mid, 'number');
        });
    });
});