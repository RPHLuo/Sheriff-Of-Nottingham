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

exports.apple=apple;
exports.bread=bread;
exports.cheese=cheese;
exports.chicken=chicken;
exports.pepper=pepper;
exports.mead=mead;
exports.silk=silk;
exports.crossbow=crossbow;