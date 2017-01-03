function player(){
	this.money=50;
	this.hand=[];
	this.sachel=[];
	this.declared="";
	this.bribe=[];
	this.apples=0;
	this.cheese=0;
	this.bread=0;
	this.chicken=0;
	this.contraband=[];
}
//prepares for next round
function softReset(player){
	player.sachel=[];
	player.declared="";
	player.bribe=[];
}
//sell goods for monetary value
function selloff(good,player){
	if(player.apples==0&&player.cheese==0&&player.bread==0&&player.chicken==0){
		//sell off contraband
		var contraband;
		while(!this.contraband.isEmpty){
			contraband=player.contraband.pop();
			player.money+=contraband.value;
			if(player.money>0){
				break;
			}
		}
	}else{
		if(good=='apples'){
			var amount = Math.ceil(this.money/2);
			player.apples-=amount;
			player.money+=amount*2;
		}else if(good=='cheese'){
			var amount = Math.ceil(this.money/3);
			player.apples-=amount;
			player.money+=amount*3;
		}else if(good=='bread'){
			var amount = Math.ceil(this.money/3);
			player.apples-=amount;
			player.money+=amount*3;
		}else if(good=='chicken'){
			var amount = Math.ceil(this.money/4);
			player.apples-=amount;
			player.money+=amount*4;
		}
	}
}
function store(goods,player){
	var index,card;
	for(var good in goods){
		index = player.hand.find(good);
		if(index){
			card=player.hand.splice(index,1)[0];
			player.sachel.push(card);
		}
	}
}
function publicInfo(player){
	var details={};
	details.money=player.money;
	details.apples=player.apples;
	details.cheese=player.cheese;
	details.bread=player.bread;
	details.chicken=player.chicken;
	details.contraband=player.contraband.length;
	details.sachel=player.sachel.length;
	details.declared=player.declared;
	return details;
}
exports.init=player;
exports.softReset=softReset;
exports.selloff=selloff;
exports.store=store;
exports.publicInfo=publicInfo;