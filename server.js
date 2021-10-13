//npm init
//npm install express --save
const express = require('express');
const app = express();
const server = require('http').Server(app);

app.get('/', (req, res) => {//after creating .get method, install nodemon globally --npm install -g nodemon
  res.status(200).write('Hello World!');
});








//set server to listen on port
server.listen(3030);
