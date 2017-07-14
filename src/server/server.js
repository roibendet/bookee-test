// Global App Settings
const express = require('express');
const app = express();

// Helpers
const port = process.env.PORT || 3000;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.json());

// webSocket Settings
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
webSocketUsers = [];
connectios = [];


// Create new user Handler
app.post('/CreateNewUser', function (req, res) {

  // import current signed up users
  const users = JSON.parse(fs.readFileSync(__dirname + '/users/users.json'));

  // Data about new user from client
  let data = req.body;

  // check for conflict (new user vs current users)
  let checkIfUserExist = users.map((user) => {
    return user.username === data.username;
  });


  // Adds new user to DB
  if (checkIfUserExist.includes(true) === false) {
    users.push(data);
    fs.writeFileSync(__dirname + '/users/users.json', JSON.stringify(users));
  }

  // response to client
  let response = checkIfUserExist.includes(true) ? 'error' : 'signin';
  res.send(response)

});


// Sign in to chat
app.post('/SignInWithThisUser', function (req, res) {

  // import current signed up users
  const users = JSON.parse(fs.readFileSync(__dirname + '/users/users.json'));

  // Data about user from client
  let data = req.body;

  // user authentication
  let check = users.map((user) => {
    if (user.username === data.username) {
      if (user.password === data.password) {
        return true
      }
    }
    if (user.username !== data.username) {
      return false
    }
  });

  // response to client
  let response = check.includes(true) ? 'signin' : 'error';
  res.send(response)


});


io.sockets.on('connection', function (socket) {
  connectios.push(socket);
  console.info('connected: %s sockets connected', connectios.length);


  // diconnected
  socket.on('disconnect', function (data) {
    webSocketUsers.splice(webSocketUsers.indexOf(socket.username), 1);
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
    webSocketUsers.push(socket.username);
    updateUserNames();
  });
  function updateUserNames() {
    io.sockets.emit('get users', webSocketUsers);
  }

});


app.get('/dist/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/bundle.js')));
app.use('/_', express.static(path.resolve(__dirname, '../dist/_')));
app.get('/**', (req, res) => res.sendFile(path.resolve(__dirname, '../../index.html')));


server.listen(port);
console.log('open in the browser at http://localhost:3000');
