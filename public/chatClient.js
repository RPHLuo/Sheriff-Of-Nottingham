function connect(cookie, socket){
	socket.on('connect', function(){
		socket.emit('intro',{"username":cookie.username,"password":cookie.password});
	});
	socket.on("message",function(data){
		$("#chatLog").append(data+"\n");
		$('#chatLog')[0].scrollTop=$('#chatLog')[0].scrollHeight; //scroll to the bottom
	});
}