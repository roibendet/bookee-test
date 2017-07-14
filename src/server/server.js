const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const os = require('os');
// const cors = require('cors');

const bodyParser = require('body-parser');

// app.use(cors({
//   origin: (origin, callback) => {
//     callback(null, true)
//   },
//   credentials: true
// }));
app.use(bodyParser.json());


const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');


let webSocketusers = [];
// users = [];
connectios = [];


fs.writeFileSync(__dirname + '//users/users.json', fs.readFileSync(__dirname + '/users/users.json'));


app.post('/CreateNewUser', function (req, res) {

  const users = JSON.parse(fs.readFileSync(__dirname + '/users/users.json'));
  let data = req.body;


  users.map((user) => {

    if (user.username === data.username) {
      return res.send('error')
    }

  });
  users.push(data);
  fs.writeFileSync(__dirname + '/users/users.json', JSON.stringify(users));
  res.send('ok')

});


app.post('/SignInWithThisUser', function (req, res) {

  const users = JSON.parse(fs.readFileSync(__dirname + '/users/users.json'));
  let data = req.body;


  users.map((user) => {
    console.info('sign in with this user', data);


    if (user.username === data.username) {

      if (user.password === data.password) {
        return res.send('signin')
      }
    }
  });
  res.send('error');


});


io.sockets.on('connection', function (socket) {
  connectios.push(socket);
  console.info('connected: %s sockets connected', connectios.length);


// diconnected
  socket.on('disconnect', function (data) {
    webSocketusers.splice(webSocketusers.indexOf(socket.username), 1);
    updateUserNames();
    connectios.splice(connectios.indexOf(socket, 1));
    console.info('disconnected: %s sockets connected', connectios.length);
  });

  //send messages
  socket.on('send message', function (data) {
    io.sockets.emit('new message', {data})
  });

  //new user
  socket.on('new user', function (data, callback) {
    callback(true);
    socket.username = data;
    webSocketusers.push(socket.username);
    console.info(webSocketusers);
    updateUserNames();
  });
  function updateUserNames() {
    io.sockets.emit('get users', webSocketusers);
  }

});


app.get('/dist/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/bundle.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../../index.html')));


server.listen(port);
console.log('open in the browser at http://localhost:3000');
