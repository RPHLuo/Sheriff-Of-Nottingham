var action,selectedFood,selectedPlayer,selectedElement,bag=[],hand=[];
$(document).ready(function(){
	//buttons from UI
	connect();
	$.ajax({
		method:'GET',
		url:'/start',
		success:function(data){
			update();
			activateActions();
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
		store(bag);
	});
	$('#bribe').click(function(){
		bribe({'amount':$('#amount').val(),'type':selectedFood});
	});
	$('#letGo').click(function(){
		letGo(selectedPlayer);
	});
	$('#check').click(function(){
		check(selectedPlayer);
	});
}
function activateCard(element){
	element.unbind();
	element.click(function(){
		var name;
		if(selectedElement){
			if(selectedElement==element){
				selectedElement=undefined;
			}else{
				if(action=='exchange'){
					name = element.children('.name').text();
					exchange(selectedElement,element)
				}else{
					selectedElement=undefined;
				}
			}
		}else{
			//take card
			if(element.attr('class')=='card'){
				if(hand.length<6/*&&action=='exchange'*/){
					exchange(element.attr('id'))
				}
			//prepare for discard
			}else{
				selectedElement=element;
			}
			
		}
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
				element.children('.apples').text('apples: '+player.apple);
				element.children('.cheese').text('cheese: '+player.cheese);
				element.children('.bread').text('bread: '+player.bread);
				element.children('.chicken').text('chicken: '+player.chicken);
				element.children('.contraband').text('contraband: '+player.contraband);
				element.children('.bag').text('bag: '+player.bag);
				element.children('.declared').text('declared: '+player.declared);
				element.children('.action').text('action: '+player.action);
			}
			//update inventory and internal variables
			bag = data.me.bag;
			hand = data.me.hand;
			action=data.me.action;
			updateInventory($('#hand'),data.me.hand,'hand');
			updateInventory($('#bag'),data.me.bag,'bag');
			//update personal data
			element=$('#stats');
			element.children('.money').text('money: '+data.me.money);
			element.children('.apples').text('apples: '+data.me.apple);
			element.children('.cheese').text('cheese: '+data.me.cheese);
			element.children('.bread').text('bread: '+data.me.bread);
			element.children('.chicken').text('chicken: '+data.me.chicken);
			element.children('.action').text('action: '+data.me.action);
			var value=0;
			//find contraband worth only player should know
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
//function to update inventory (bag and hand)
function updateInventory(div,arr,name){
	div.empty();
	var title = $('<p>'+name+'</p>');
	title.addClass('title');
	div.append(title);
	var value,name,penalty,curDiv;
	for(var i=0;i<arr.length;i++){
		var good = arr[i];
		value=good.value;
		name=good.name;
		penalty=good.penalty;
		curDiv=$('<div></div>');
		curDiv.append('<p>value: '+value+'</p>');
		curDiv.append('<p>'+name+'</p>');
		curDiv.append('<p>penalty: '+penalty+'</p>');
		div.append(curDiv);
	}
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
			div.append('<p class="name">'+card.name+'</p>');
			div.append('<p>penalty: '+card.penalty+'</p>');
		}
	}
	activateCard(div);
}

//exchange cards
function exchange(from,to){
	//discard
	if(to){
		$.ajax({
			method:'POST',
			url:'/discard',
			datatype: 'json',
			data:{'from':from,'deck':to}
		});
	}else{
	//take from
		$.ajax({
			method:'POST',
			url:'/take',
			data:{'deck':from}
		});
	}
}
//smuggler actions
function bribe(offer){
	//input amount
	$.ajax({
		method:'POST',
		url:'/bribe',
		datatype: 'json',
		data:{'offer':offer}
	});
}
function store(bag){
	$.ajax({
		method:'POST',
		url:'/store',
		data:{'bag':bag}
	});
}
//sheriff actions
function check(selectedPlayer){
	//input amount
	$.ajax({
		method:'POST',
		url:'/check',
		data:{'player':selectedPlayer}
	});
}
function letGo(selectedPlayer){
	$.ajax({
		method:'POST',
		url:'/letGo',
		data:{'player':selectedPlayer}
	});
}