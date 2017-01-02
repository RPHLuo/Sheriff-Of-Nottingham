//socket.io chat function
//used to serve different types of communication between players

function connect(io,users){
	io.on("connection", function(socket){
		console.log("Got a connection");
		socket.on("intro",function(data){
			var username = data.username;
			var password = data.password;
			if(users[username].password==password){
				users[username].socket=socket;
			}
		});
		socket.on("messsage",function(data){
			//app serves only 1 game currently
			for(var user in users){
				console.log(user);
				user.socket.emit("message","{user.username}:"+data);
			}
		});
		socket.on("disconnect", function(){
			console.log(socket.username+" disconnected");
			io.emit("message", timestamp()+": "+socket.username+" disconnected.");
		});
	});
}
function informUpdates(socket){
	socket.emit("update");
}
exports.connect=connect;
exports.update=informUpdates;