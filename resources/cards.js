function apple(){
	this.name="apple";
	this.value=2;
	this.penalty=2;
	this.illegal=false;
}
function bread(){
	this.name="bread";
	this.value=3;
	this.penalty=2;
	this.illegal=false;
}
function cheese(){
	this.name="cheese";
	this.value=3;
	this.penalty=2;
	this.illegal=false;
}
function chicken(){
	this.name="chicken";
	this.value=4;
	this.penalty=2;
	this.illegal=false;
}
function pepper(){
	this.name="pepper";
	this.value=6;
	this.penalty=4;
	this.illegal=true;
}
function mead(){
	this.name="mead";
	this.value=7;
	this.penalty=4;
	this.illegal=true;
}
function silk(){
	this.name="silk";
	this.value=8;
	this.penalty=4;
	this.illegal=true;
}
function crossbow(){
	this.name="crossbow";
	this.value=9;
	this.penalty=4;
	this.illegal=true;
}
//hard code card count
function createDeck(){
	var deck=[];
	for (var i=0;i<48;i++){
		deck.push(new apple());
		if(i<36){
			deck.push(new bread());
			deck.push(new cheese());
			if(i<24){
				deck.push(new chicken());
				if(i<18){
					deck.push(new pepper());
					if(i<16){
						deck.push(new mead());
						if(i<9){
							deck.push(new silk());
							if(i<5){
								deck.push(new crossbow());
							}
						}
					}
				}
			}
		}
	}
	shuffle(deck);
	return deck;
}
//takes an array and randomly shuffles the deck like quicksort
function shuffle(deck){
	var pivot,temp;
	for(var i=0;i<deck.length;i++){
		pivot=Math.random()*deck.length;
		temp=deck[i];
		deck[i]=deck[pivot];
		deck[pivot]=temp;
	}
}

exports.apple=apple;
exports.bread=bread;
exports.cheese=cheese;
exports.chicken=chicken;
exports.pepper=pepper;
exports.mead=mead;
exports.silk=silk;
exports.crossbow=crossbow;
exports.shuffle=shuffle;
exports.createDeck=createDeck;