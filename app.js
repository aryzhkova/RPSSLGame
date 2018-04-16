const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const server = http.createServer(app);
var io = require('socket.io')(server);
var port = 3000;
const currentStatic = require('./gulp/config').root;
const GestureGame = require('./models/gestureGame');

//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,currentStatic)));

app.use('/',require('./routes/index'));

// 404 catch-all-handler
app.use(function(req,res,next){
   res.status(404).render('404');
});
// 500 error-handler
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(505).render('505');
});

server.listen(port,'localhost');
server.on('listening',function(){
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

io.on('connection', onConnection);
io.on('reconnect', onReconnect);

var waitingPlayer = null;

function onConnection(socket){
    socket.emit('msg','Hello user '+socket.id.toString() +" ! :)");
    socket.on('msg',function (txt) { // server sand message to all connected users in chat window
        io.emit('msg',txt);
    });
    if(waitingPlayer){ //connected to server > 1 users
        waitingPlayer.emit('game is ready','Game is ready');
        socket.emit('game is ready','Game is ready');
        new GestureGame(waitingPlayer,socket);
        waitingPlayer = null;
    }else{
        waitingPlayer = socket;
        waitingPlayer.emit('waiting','You are waiting for a second player...');
    }
}

function onReconnect(socket){
    socket.emit('reconnect');
}