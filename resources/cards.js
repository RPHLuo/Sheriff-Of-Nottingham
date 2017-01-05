/*
author:Robin Luo
Purpose: Simple file to construct and shuffle cards objects 
*/

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
//Fisher-Yates shuffle algorithm --taken from online
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
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