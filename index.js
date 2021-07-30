//node server to handle socket.io connections
const io = require('socket.io')(5500, {cors:{origin:'*'}})

const users = {};

io.on('connection',socket=>{
    socket.on('new-user-joined', name=>{
        users[socket.id] = name; //new user appended in users
        // console.log("New User", name);
        socket.broadcast.emit('user-joined', name);  //broadcast.emit se jisne chat join kiya usko chhodke sabko msg jaayega
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('leave', users[socket.id]);
        delete users[socket.id];
    })
})
