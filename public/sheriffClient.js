var status,gold,contraband=[],apples=[],cheese=[],bread=[],chicken=[];
$(Document).ready(function(){
	//buttons from UI
	connect();
	$.ajax({
		method:'GET',
		url:'/start',
		success:function(data){
			$('#ready').remove();
		}
	});
});
function update(){
	$.ajax({
		method:'GET',
		url:'/update',
		datatype:'json',
		success:function(data){
			//update info
			var players = data.players;
			var player,element;
			for(var username in players){
				player = players[username];
				if($('#P1 .player').val()==username||$('#P1.player').val()==''){
					element = $('#P1');
				}else{
					element = $('#P2');
				}
				element.children('.player').text(username);
				element.children('.money').text('money: '+player.money);
				element.children('.apples').text('apples: '+player.apples);
				element.children('.cheese').text('cheese: '+player.cheese);
				element.children('.bread').text('bread: '+player.bread);
				element.children('.chicken').text('chicken: '+player.chicken);
				element.children('.contraband').text('contraband: '+player.contraband);
				element.children('.bag').text('bag: '+player.sachel);
				element.children('.declared').text('declared: '+player.declared);
			}
		}
	});
}



//smuggler actions
function bribe(){
	//input amount
	$.ajax({
		method:'POST',
		url:'/bribe',
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
function store(){
	$.ajax({
		method:'POST',
		url:'/store',
		datatype: 'json',
		success:function(data){
			
		}
	});
}
//sheriff actions
function check(){
	//input amount
	$.ajax({
		method:'POST',
		url:'/check',
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}
function letGo(){
	$.ajax({
		method:'POST',
		url:'/letGo',
		datatype: 'json',
		success:function(data){
			//check if bribe is taken
		}
	});
}