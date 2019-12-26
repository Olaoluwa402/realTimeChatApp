const io = require('socket.io')(3000);
 

const users = {};

io.on('connection', socket => {
     socket.on('new-user', name =>{
       users[socket.id] = name;
       socket.broadcast.emit('user-connected', name);
     });



	// console.log('New User');
	// socket.emit('chat-message', 'Hello world');
	socket.on('send-chat-message', message => {
	// console.log(message);
	socket.broadcast.emit('chat-message', {message:message, name:users[socket.id]});
  });

   socket.on('disconnect', () =>{
   	   socket.broadcast.emit('user-disconnected', users[socket.id] );
       delete users[socket.id];
     });
});




const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.set("layout", "layouts/layout");
app.use(expressLayouts);

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


app.get("/", function(req, res){
  res.render("index");
});


var port = process.env.PORT;
if(port == null || port == " "){
    port = 5000;
}

app.listen(port, function(){
   console.log("Your Server Has Started!");
});