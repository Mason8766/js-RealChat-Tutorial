/*
  COMP 2068 - Real Time Chat Group
*/

// Import required modules
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// set up socket.io
const { Server } = require("socket.io");
const io = new Server(server);

// set up mongoose and message model
// as well as connect the mongoose
var mongoose = require('mongoose');
var dbUrl = "mongodb+srv://masonDouglas:superpassword@cluster0.i4b1t.mongodb.net/realchat";
var Message = mongoose.model('message',{time : String, username : String, message : String});
var conn = mongoose.connection;
mongoose.connect(dbUrl , (err) => { 
  if (err == null) {
    console.log('Mongoose is connected!');
  }
  else {
    console.log('Mongoose is not connected...', err);
  }
});

// Load index.html on empty url
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// io.on connection method
// finds a message object in a database
// to load messages to the main page
// saves a user message to the db
// using .save function
io.on('connection', (socket) => {
    Message.find({}, function (err, msgsJson) {
      if(err) {
        console.log(err);
      }
      else {
        socket.emit("load messages", msgsJson);
      }
    });
    socket.on('chat message', (now,msg,nme) => {
        io.emit('chat message', now,msg,nme);
        const m = new Message({
            time: now,
            username: nme,
            message: msg
        });
        m.save();
    });
});

// port
const { PORT=3000 } = process.env;
server.listen(PORT, () => {
    console.log('listening on *:3000');
});
