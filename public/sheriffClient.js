var status,gold,contraband=[],apples=[],cheese=[],bread=[],chicken=[];
$(Document).ready(function(){
	//buttons from UI
	$("#ready").click(function(){
		$.ajax({
			method:"GET",
			url:"/start",
			success:function(data){
				connect();
			}
		});
	});
});
function update(){
	$.ajax({
		method:"GET",
		url:"/update",
		datatype:'json',
		success:function(data){
			//update info
			connect();
		}
	});
}



//smuggler actions
function bribe(){
	//input amount
	$.ajax({
		method:"POST",
		url:"/bribe",
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
function store(){
	$.ajax({
		method:"POST",
		url:"/store",
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
//sheriff actions
function check(){
	//input amount
	$.ajax({
		method:"POST",
		url:"/check",
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
function letGo(){
	$.ajax({
		method:"POST",
		url:"/letGo",
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
function update(){
	
}