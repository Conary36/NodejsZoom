//npm init
//npm install express --save
const express = require('express');
const app = express();
//Install uuid: npm install uuid
//then set uuid to const variable
const {v4: uuidv4} = require('uuid');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true
});

//after installing ejs, we can use it to render html by linking it to the server.js file
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/peerjs', peerServer);
app.get('/', (req, res) => {
  //after creating .get method, install nodemon globally --npm install -g nodemon
  //   res.status(200).send('Hello World!');
  // res.render('room');
  res.redirect(`/${uuidv4()}`);
});
app.get('/:room', (req, res) => {
    res.render('room', {roomId: req.params.room});
});

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {//MUST BE SAME ON SCRIPT.JS AND SERVER.JS
        // console.log("joined room");
        socket.join(roomId);
        socket.to(roomId).emit(userId)//removed .broadcast.emit
    })
})
//To run: --nodemon server.js






//set server to listen on port
server.listen(3030);
