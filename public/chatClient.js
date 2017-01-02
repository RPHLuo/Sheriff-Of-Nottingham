function connect(){
	var socket = io();
	socket.on('connect', function(){
		socket.emit('intro',{"username":cookie.username,"password":cookie.password});
	});
	socket.on("message",function(data){
		$("#chatbox").append(data+"\n");
		$('#chatbox')[0].scrollTop=$('#chatbox')[0].scrollHeight; //scroll to the bottom
	});
	
	
	//sending messages
	$('#messagebar').keypress(function(ev){
		if(ev.which===13){
			//send message
			socket.emit("message",$(this).val());
			ev.preventDefault(); //if any
			$(this).val(""); //empty the input
		}
	});
}
function update(){
	
}