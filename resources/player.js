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
	function softReset(){
		this.sachel=[];
		this.declared="";
		this.bribe=[];
	}
}
exports.init=player;