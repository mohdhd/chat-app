var express = require('express');
var socket = require('socket.io');

var app = express()

var server = app.listen(4000,function(){
    console.log('listening on port 4000');
});

var io = socket(server);
let msg_id = 0

io.on('connection',function(socket){
    
    console.log('a connection has been made');

    socket.on('chat', function (data) {

        msg_id += 1;
        data.id = msg_id;

        io.sockets.emit('chat', data);

        

    });


    socket.on('online',function(data){
        socket.broadcast.emit('online',data);
    });

    socket.on('delete', function (data) {
        socket.broadcast.emit('delete', data);
    });

});



