function connect(){
	var socket = io();
	socket.on('connect', function(){
		var cookie = getCookie(document.cookie);
		var username = cookie.username;
		var password = cookie.password;
		socket.emit('intro',{"username":username,"password":password});
	});
	socket.on('message',function(data){
		$('#chatbox').append(data+'\n');
		$('#chatbox')[0].scrollTop=$('#chatbox')[0].scrollHeight; //scroll to the bottom
	});
	socket.on('update',function(){
		update();
	});
	
	//sending messages
	$('#messagebar').keypress(function(ev){
		if(ev.which===13){
			//send message
			socket.emit('message',$(this).val());
			ev.preventDefault(); //if any
			$(this).val(""); //empty the input
		}
	});
	//parse the cookie into an object
	function getCookie(cookie){
		var username,password;
		var arr = cookie.split(';');
		for(var i=0;i<arr.length;i++){
			arr[i] = arr[i].trim();
			if(arr[i].split("=")[0]=='username'){
				username = arr[i].split("=")[1];
			}else if(arr[i].split("=")[0]=='password'){
				password = arr[i].split("=")[1];
			}
		}
		return {'username':username,'password':password};
	}
}