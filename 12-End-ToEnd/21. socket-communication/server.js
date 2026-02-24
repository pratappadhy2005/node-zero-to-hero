const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();

const server = http.createServer(app);

//initialize socket.io and attach it to the http server
const io = socketIO(server);

app.use(express.static('public'));

const users = new Set();

io.on('connection', (socket) => {
    console.log('A user connected');
    users.add(socket.id);
    io.emit('user-list', [...users]);
})