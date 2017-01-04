//Robin Luo
//game of Nottingham game
//Interactive web app to run game of Nottingham

var express = require("express");
var game = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cards = require('./resources/cards');
var player = require('./resources/player');
var chat = require('./resources/chat');
//good
var authentication = require('./resources/authentication');

var http = require('http').createServer(game);
var io = require('socket.io')(http);
//transfer to use mongo put on backlog
//var mongodb = require('mongodb')
//var mongoClient = mongodb.MongoClient;
var ROOT = './public';


//shared resources
var decks={"leftDeck":[],"rightDeck":[],"leftHeap":[],"rightHeap":[]};
var players={};
var playerOrder=[];
var currentSheriff;
var activePlayers=0;

game.set('views','./public');
game.set('view engine','pug');
game.use(bodyParser.urlencoded({extended:false}));
game.use(cookieParser());


//states the request
game.use(function(req,res, next){
	console.log('request for ' + req.url);
	next();
});
//sign in
game.get("/", function(req, res){
	authentication.signin(req,res,players);
});

game.post("/signup", function(req, res){
	authentication.signup(req,res,players);
});



//game behaviour

game.get('/start',function(req,res){
	var username = req.cookies.username;
	players[username]["ready"]=true;
	players[username].game= new player.init();
	activePlayers++;
	//change to 2 or 3 in the future, 1 is for testing purposes
	if(activePlayers>1){
		//remove people not in game since app only serves 1 game for now
		for(var playername in players){
			if(!players[playername].ready){
				delete players[playername];
			}else{
				playerOrder.push(playername);
			}
		}
		currentSheriff=playerOrder[0];
		players[playerOrder[1]].game.action='exchange';
		//if more than 1 people start game
		decks.leftDeck=cards.createDeck();
		for(var i=0;i<decks.leftDeck.length/2;i++){
			decks.rightDeck.push(decks.leftDeck[decks.leftDeck.length-1]);
			decks.leftDeck.pop();
		}
		for(var i=0;i<5;i++){
			decks.leftHeap.push(decks.leftDeck[decks.leftDeck.length-1]);
			decks.rightHeap.push(decks.rightDeck[decks.rightDeck.length-1]);
			decks.leftDeck.pop();
			decks.rightDeck.pop();
		}
		chat.update(players);
	}
	res.sendStatus(200);
});


//update
game.get('/update',function(req,res){
	var username = req.cookies.username;
	if(validate(req.cookies)){
		var results={};
		results.me = players[username].game;
		results.heap1 = decks.leftHeap;
		results.heap2 = decks.rightHeap;
		results.deck1 = decks.leftDeck.length;
		results.deck2 = decks.rightDeck.length;
		results.players={};
		for(var playername in players){
			if(playername!=username && players[playername].game){
				results.players[playername]=player.publicInfo(players[playername].game);
			}
		}
		res.json(results);
	}else{
		res.sendStatus(401);
	}
});

//sheriff actions
//check them
game.post('/check',function(req,res){
	var smuggler = req.body.username;
	var sheriff = req.cookies.username;
	if(validate(req.cookies)){
		var results = player.check(smuggler,sheriff,players,decks);
		chat.update(players);
		res.json(results);
	}else{
		res.sendStatus(401);
	}
});
//believe them
game.post('/letGo',function(req,res){
	if(validate(req.cookies)){
		var smuggler = players[req.body.username];
		var sheriff = players[req.cookies.username];
		player.passThrough(smuggler,sheriff);
		chat.update(players);
		res.sendStatus(200);
	}else{
		res.sendStatus(401);
	}
});

//smuggler actions
//bribe sheriff with goods or money NOT DONE
game.post('/bribe',function(req,res){
	if(validate(req.cookies)){
		var sheriffStats = players[sheriff].game;
		
	}else{
		res.sendStatus(401);
	}
});
//put goods in bag then allows the next player to exchange
game.post('/store',function(req,res){
	if(validate(req.cookies)){
		var smuggler = players[req.cookies.username].game;
		player.store(smuggler);
		player.nextUp(currentSheriff,playOrder,players);
		chat.update(players);
		res.sendStatus(200);
	}else{
		res.sendStatus(401);
	}
});

function findDeck(deckName){
	var deck;
	if(deckName=="C1"){
		deck = decks.leftDeck;
	}else if(deckName=="C2"){
		deck = decks.leftHeap;
	}else if(deckName=="C3"){
		deck = decks.rightHeap;
	}else if(deckName=="C4"){
		deck = decks.rightDeck;
	}
	return deck;
}
//take
game.post('/take',function(req,res){
	if(validate(req.cookies)){
		var smuggler = players[req.cookies.username].game;
		var deck = findDeck(req.body.deck);
		player.take(smuggler,deck);
		chat.update(players);
		res.sendStatus(200);
	}else{
		res.sendStatus(401);
	}
});
//discard
game.post('/discard',function(req,res){
	if(validate(req.cookies)){
		var playerGame = players[req.cookies.username].game;
		var deck = findDeck(req.body.deck);
		player.discard(playerGame,req.body.name,deck);
		chat.update(players);
		res.sendStatus(200);
	}else{
		res.sendStatus(401);
	}
});

//validate authentication
function validate(cookie){
	var username = cookie.username;
	var password = cookie.password;
	if(players[username]&&players[username].password==password){
		return true;
	}
	return false;
}

//static handling
game.use(express.static(ROOT));

game.get('*',function(req,res){
	res.render('signup');
});

var server = game.listen(2406, function(){
	console.log("Server is listening on port 2406");
});
io.listen(server);
chat.connect(io,players);