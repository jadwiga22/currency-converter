var http = require('http');
var express = require('express');
var app = express();
var exchange = require('./exchange.js');
var parser = require('./parser.js');


app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));


app.get('/', async (req, res) => {
    var rate = await exchange.GetExchangeRate();
    res.render('index', {
        send: "",
        receive: "",
        rate: rate,
        message: ""
    });    
});

app.post('/', async (req, res) => {
    var send = req.body.send;
    var receive = req.body.receive;
    var rate = await exchange.GetExchangeRate();
    var message;
    if(( send === "" && receive === "" ) || ( send !== "" && receive !== "" )) {
        res.render('index', {
            send: send,
            receive: receive,
            rate: rate,
            message: "Enter value into exactly one of the fields above."
        });
    } else {
        if( send === "" ){
            var parsedReceive = parser.Parser(receive);
            if( !parsedReceive ) {
                res.render('index', {
                    send: send,
                    receive: receive,
                    rate: rate,
                    message: "Enter value in a correct format, which is  a string containing only digits or a string containing dot as a decimal separator."
                });
            } else {
                send = parsedReceive/rate;
                res.render('index', {
                    send: send,
                    receive: parsedReceive,
                    rate: rate,
                    message: ""
                });
            }
           
        } else {
            var parsedSend = parser.Parser(send);
            if( !parsedSend ) {
                res.render('index', {
                    send: send,
                    receive: receive,
                    rate: rate,
                    message: "Enter value in a correct format, which is  a string containing only digits or a string containing dot as a decimal separator."
                });
            } else {
                receive = parsedSend*rate;
                res.render('index', {
                    send: parsedSend,
                    receive: receive,
                    rate: rate,
                    message: ""
                });
            }
        }
    }
})

http.createServer(app).listen(3000);
console.log('started');

