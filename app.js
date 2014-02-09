var express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);

var options = {
    host: '10.194.142.32',
    path: '/trimBatchWeb/dataCurrency',
    //since we are listening on a custom port, we need to specify it by hand
    port: '8080',
    //This is what changes the request to a POST request
    method: 'GET'
};

// Use promises you noob
var callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
        str += chunk;
    });

    response.on('end', function () {
        console.log(str);
    });
}

setInterval(function () {
    var req = http.request(options, callback);
    req.end();
}, 2000);



app.get('/', function(req, res) {
    res.send('<!doctype html> \
            <html> \
            <head><meta charset="utf-8"></head> \
            <body> \
                 <center>Welcome to <strong>socket.io</strong></center> \
                 <script src="/socket.io/socket.io.js"></script> \
                 <script> \
                    var socket = io.connect(); \
                    socket.emit("message", "Howdy"); \
                    setInterval(function () { \
                        socket.emit("message", "Ping"); \
                    }, 1000); \
                 </script> \
            </body> \
            </html>');
});

io.sockets.on('connection', function (socket) {
    socket.on('message', function(msg) {
        console.log(msg);
    });
});

server.listen(8000);