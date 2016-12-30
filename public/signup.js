$(document).ready(function(){
	$("#signup").click(function(){
		var username = $("#username").val();
		var password = $("#password").val();
		$.post("/signin",{"username":username,"password":password},function(err, data){
			location.reload();
		});
	});
});