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
	//prepares for next round
	function softReset(){
		this.sachel=[];
		this.declared="";
		this.bribe=[];
	}
	//sell goods for monetary value
	function selloff(good){
		if(this.apples==0&&this.cheese==0&&this.bread==0&&this.chicken==0){
			//sell off contraband
			var contraband;
			while(!this.contrabank.isEmpty){
				contraband=this.contraband.pop();
				this.money+=contrabank.value;
				if(this.money>0){
					break;
				}
			}
		}else{
			if(good=='apples'){
				var amount = Math.ceil(this.money/2);
				this.apples-=amount;
				this.money+=amount*2;
			}else if(good=='cheese'){
				var amount = Math.ceil(this.money/3);
				this.apples-=amount;
				this.money+=amount*3;
			}else if(good=='bread'){
				var amount = Math.ceil(this.money/3);
				this.apples-=amount;
				this.money+=amount*3;
			}else if(good=='chicken'){
				var amount = Math.ceil(this.money/4);
				this.apples-=amount;
				this.money+=amount*4;
			}
		}
	}
	function store(goods){
		var index,card;
		for(var good in goods){
			index = this.hand.find(good);
			if(index){
				card=this.hand.splice(index,1)[0];
				this.sachel.push(card);
			}
		}
	}
	function publicInfo(){
		var details={};
		details.money=this.money;
		details.apples=this.apples;
		details.cheese=this.cheese;
		details.bread=this.bread;
		details.chicken=this.chicken;
		details.contraband=this.contraband.length;
		details.sachel=this.sachel.length;
		details.declared=this.declared;
		return details;
	}
}
exports.init=player;