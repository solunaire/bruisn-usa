var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var numPeeps = 0;

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/test.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  numPeeps++;
  switch (numPeeps){
    case 1:
      socket.emit('type','host');
      break;
    case 2:
      socket.emit('type', 'blue');
      break;
    case 3:
      socket.emit('type', 'red');
      break;
    default:
      socket.emit('type', 'other');
      break;
  }

  socket.on('disconnect', function(){
    console.log('user disconnected');
    numPeeps--;
  });

  socket.on('rotation', function(data){
    io.emit('rotate', data);
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
