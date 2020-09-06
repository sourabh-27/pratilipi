const express = require('express'); //importing express
const app = express(); //firing up express
const path = require('path');

const PORT = process.env.PORT || 5000; //port

// Setting up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const routes = require('./routes/index'); //use express router


//socket server for live watching
var io = require('socket.io').listen(7777);
var count = 0;
io.sockets.on('connection', function(socket) {
    count++;
    io.sockets.emit('message', { count: count});

    socket.on('disconnect', function(){
        count--;
        io.sockets.emit('message', { count: count });
    })
});

var io2 = require('socket.io').listen(8000);
var count2 = 0;
io2.sockets.on('connection', function(socket) {
    count2++;
    io2.sockets.emit('message', { count2: count2});

    socket.on('disconnect', function(){
        count2--;
        io2.sockets.emit('message', { count2: count2 });
    })
});

var io3 = require('socket.io').listen(8003);
var count3 = 0;
io3.sockets.on('connection', function(socket) {
    count3++;
    io3.sockets.emit('message', { count3: count3 });

    socket.on('disconnect', function(){
        count3--;
        io3.sockets.emit('message', { count3: count3 });
    })
});

var io4 = require('socket.io').listen(8004);
var count4 = 0;
io4.sockets.on('connection', function(socket) {
    count4++;
    io4.sockets.emit('message', { count4: count4 });

    socket.on('disconnect', function(){
        count4--;
        io4.sockets.emit('message', { count4: count4 });
    })
});

var io5 = require('socket.io').listen(8005);
var count5 = 0;
io5.sockets.on('connection', function(socket) {
    count5++;
    io5.sockets.emit('message', { count5: count5 });

    socket.on('disconnect', function(){
        count5--;
        io5.sockets.emit('message', { count5: count5 });
    })
});

var io6 = require('socket.io').listen(8006);
var count6 = 0;
io6.sockets.on('connection', function(socket) {
    count6++;
    io6.sockets.emit('message', { count6: count6});

    socket.on('disconnect', function(){
        count6--;
        io6.sockets.emit('message', { count6: count6 });
    })
});

app.get('/', routes); //express index router
app.post('/register', routes);
app.get('/login', routes);
app.post('/login', routes);
app.get('/success', routes);
app.get('/logout', routes);
app.post('/addmsg', routes);
app.get('/story1', routes);
app.get('/story2', routes);
app.get('/story3', routes);
app.get('/story4', routes);
app.get('/story5', routes);
app.get('/story6', routes);

app.listen(PORT, () => console.log("Server started at port: ", PORT));