function apple(){
	this.value=2;
	this.illegal=false;
}
function bread(){
	this.value=3;
	this.illegal=false;
}
function cheese(){
	this.value=3;
	this.illegal=false;
}
function chicken(){
	this.value=4;
	this.illegal=false;
}
function pepper(){
	this.value=6;
	this.illegal=true;
}
function mead(){
	this.value=7;
	this.illegal=true;
}
function silk(){
	this.value=8;
	this.illegal=true;
}
function crossbow(){
	this.value=9;
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