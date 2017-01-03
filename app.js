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
//var mongodb = require('mongodb')
//var mongoClient = mongodb.MongoClient;
var ROOT = './public';


//shared resources
var decks={"leftDeck":[],"rightDeck":[],"leftHeap":[],"rightHeap":[]};
var players={};
var activePlayers=0;

game.set('views','./public');
game.set('view engine','pug');
game.use(bodyParser.urlencoded({extended:false}));
game.use(cookieParser());
game.use(function(req,res, next){
	console.log('request for ' + req.url);
	next();
});
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
	if(activePlayers>1){
		//if more than 1 people start game
		decks.leftDeck=cards.createDeck();
		for(var i=0;i<decks.leftDeck.length/2;i++){
			decks.rightDeck.push(decks.leftDeck.pop());
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
		var smugglerStats = players[smuggler].game;
		var declared = smugglerStats.declared;
		var sheriffStats = players[sheriff].game;
		var lying=false;
		var penalty=0;
		for(var good in smugglerStats.sachel){
			if(good.name!=declared){
				//reset penalty to start being incurred to smuggler
				if(!lying){
					penalty=0;
				}
				lying=true;
				penalty+=good.penalty;
			}else{
				//if player has been consistently truthful add more penalty
				if(!lying){
					penalty+=good.penalty;
				}
			}
			smugglerStatus.softReset();
			sheriffStatus.softReset();
			var result;
			if(!lying){
				sheriffStats.money-=penalty;
				smugglerStats.money+=penalty;
				result = "Tricked again! You lost {penalty} coins for incorrect inspection";
			}else{
				sheriffStats.money+=penalty;
				smugglerStats.money-=penalty;
				result = "Gotcha! You caught them red handed. Nothing like a good profit";
			}
			res.json({"result":result});
			res.sendStatus(200);
		}
	}else{
		res.sendStatus(401);
	}
});
//believe them
game.post('/letGo',function(req,res){
	
});

//smuggler actions
//bribe
game.post('/bribe',function(req,res){
	if(validate(req.cookies)){
		var sheriffStats = players[sheriff].game;
	}
});
//put goods in bag
game.post('/store',function(req,res){
	if(validate(req.cookies)){
		var sheriffStats = players[sheriff].game;
		player.store(sheriffStats);
	}
});
//exchange resources
game.post('/exchange',function(req,res){
	if(validate(req.cookies)){
		var sheriffStats = players[sheriff].game;
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

game.get('*',function(){
	//render 404 page
	//render(404);
});

var server = game.listen(2406, function(){
	console.log("Server is listening on port 2406");
});
io.listen(server);
chat.connect(io,players);