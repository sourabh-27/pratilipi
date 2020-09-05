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
    io.sockets.emit('message', { count: count });

    socket.on('disconnect', function(){
        count--;
        io.sockets.emit('message', { count: count });
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

app.listen(PORT, () => console.log("Server started at port: ", PORT));