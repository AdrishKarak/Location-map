const express = require('express');
const app = express();
const path = require('path');
const http = require('http');
const dotenv = require('dotenv');
const socketio = require('socket.io');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = socketio(server);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('send-Location', function (data) {
        io.emit("receive-Location", {id: socket.id , ...data});
    })
   socket.on("disconnect", function() {
    io.emit("user-disconnected", socket.id);
   })
})

app.get('/', (req, res) => {
    res.render('index', {title: 'Map'});
})

server.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
});