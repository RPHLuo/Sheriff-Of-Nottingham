$(document).ready(function(){
	$("#signup").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post("/signup",{"username":username,"password":password},function(err, data){
			location.reload();
		});
	});
});