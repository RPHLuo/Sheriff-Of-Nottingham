//socket.io chat function
//used to serve different types of communication between players

function connect(io,users){
	io.on("connection", function(socket){
		console.log("Got a connection");
		socket.on("intro",function(data){
			console.log("intro recieved");
			var username = data.username;
			var password = data.password;
			if(users[username]&&users[username].password==password){
				users[username].socket=socket;
			}
			socket.username = username;
			emitAll('message',timestamp()+": Welcome "+username+"!");
		});
		socket.on("message",function(data){
			//app serves only 1 game currently
			emitAll('message',timestamp()+", "+socket.username+": "+data);
		});
		socket.on("disconnect", function(){
			console.log(socket.username+" disconnected");
			io.emit("message", timestamp()+": "+socket.username+" disconnected.");
		});
		function emitAll(type,data){
			for(var user in users){
				if(users[user].socket){
					users[user].socket.emit(type,data);
				}
			}
		}
		function timestamp(){
			return new Date().toLocaleTimeString();
		}
	});
}
function informUpdates(users){
	for(var user in users){
		if(users[user].socket){
			users[user].socket.emit('update');
		}
	}
}
exports.connect=connect;
exports.update=informUpdates;