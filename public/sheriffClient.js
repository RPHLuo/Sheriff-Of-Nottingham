var selectedFood,selectedPlayer,bag=[],hand=[];
$(Document).ready(function(){
	//buttons from UI
	connect();
	$.ajax({
		method:'GET',
		url:'/start',
		success:function(data){
			update();
			
		}
	});
	
});
function activateActions(){
	$('#apple').click(function(){
		selectedFood='apple';
	});
	$('#cheese').click(function(){
		selectedFood='cheese';
	});
	$('#bread').click(function(){
		selectedFood='bread';
	});
	$('#chicken').click(function(){
		selectedFood='chicken';
	});
	$('#clear').click(function(){
		selectedFood='';
		selectedPlayer='';
	});
	$('#store').click(function(){
		$.ajax({
			method:'POST',
			url:'/store',
			datatype:'json',
			data:bag
		});
	});
	$('#bribe').click(function(){
		$.ajax({
			method:'POST',
			url:'/bribe',
			datatype:'json',
			data:{'amount':$('#amount').val(),'type':selectedFood}
		});
	});
	$('#letGo').click(function(){
		$.ajax({
			method:'POST',
			url:'/letGo',
			data:selectedPlayer
		});
	});
	$('#check').click(function(){
		$.ajax({
			method:'POST',
			url:'/check',
			data:selectedPlayer
		});
	});
}


function update(){
	$.ajax({
		method:'GET',
		url:'/update',
		datatype:'json',
		success:function(data){
			//update player data
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
				element.children('.bag').text('bag: '+player.bag);
				element.children('.declared').text('declared: '+player.declared);
			}
			//update personal data
			element=$('#stats');
			element.children('.money').text('money: '+data.me.money);
			element.children('.apples').text('apples: '+data.me.apples);
			element.children('.cheese').text('cheese: '+data.me.cheese);
			element.children('.bread').text('bread: '+data.me.bread);
			element.children('.chicken').text('chicken: '+data.me.chicken);
			var value=0;
			for(var item in data.me.contraband){
				value+=item.value;
			}
			element.children('.contraband').text('contraband: '+data.me.contraband.length+' ($'+value+')');
			element.children('.declared').text('declared: '+data.me.declared);
			//update decks
			updateDeck($('#C1'),data.deck1,true);
			updateDeck($('#C4'),data.deck2,true);
			updateDeck($('#C2'),data.heap1,false);
			updateDeck($('#C3'),data.heap2,false);
		}
	});
}
//function to update each deck
function updateDeck(div,data,faceDown){
	div.empty();
	if(faceDown){
		if(data==0){
			div.append('<p>End of Pile</p>');
			div.css('background-color','#000');
		}else{
			div.css('background-color','#900');
		}
	}else{
		if(data.length==0){
			div.append('<p>End of Pile</p>');
			div.css('background-color','#000');
		}else{
			var card = data[data.length-1];
			div.css('background-color','#fff');
			div.css('color','#000');
			div.append('<p>value: '+card.value+'</p>');
			div.append('<p>'+card.name+'</p>');
			div.append('<p>penalty: '+card.penalty+'</p>');
		}
	}
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