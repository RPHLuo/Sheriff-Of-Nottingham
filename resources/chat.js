//socket.io chat function
//used to serve different types of communication between players

function connect(io){
	io.on("connection", function(socket){
		console.log("Got a connection");
		clients.push(socket);
		socket.on("intro",function(data){
			socket.username = data;
			socket.blocked = [];
			socket.broadcast.emit("message", timestamp()+": "+socket.username+" has entered the chatroom.");
			socket.emit("message","Welcome, "+socket.username+".");
			socket.broadcast.emit("userList",getUserList());
			socket.emit("userList", getUserList());
		});
		function getUserList(){
	    	var ret = [];
	    	for(var i=0;i<clients.length;i++){
	    	    ret.push(clients[i].username);
	    	}
	    	return ret;
		}	
		socket.on("message", function(data){
			console.log("got message: "+data);
	    	for(var i=0;i<clients.length;i++){
	    		if(clients[i].blocked.indexOf(socket.username)===-1){
					clients[i].emit("message",timestamp()+", "+socket.username+": "+data);
				}
			}
		});
		socket.on("privateMessage", function(data){
			var message = data.message;
			var username = data.username;
			console.log("private message!: "+message);
			console.log("finding " + username);
	    	for(var i=0;i<clients.length;i++){
				if(clients[i].username === username){
					if(clients[i].blocked.indexOf(socket.username) === -1){
						clients[i].emit("privateMessage",{"message":message, "username":socket.username});
					}else{
						console.log("message blocked by " + clients[i].username);
					}
					break;
				}
			}
			
		});
		socket.on("disconnect", function(){
			console.log(socket.username+" disconnected");
			io.emit("message", timestamp()+": "+socket.username+" disconnected.");
			clients = clients.filter(function(ele){  
	       		return ele!==socket;
			});
			socket.broadcast.emit("userList", getUserList());
		});
	});
}
