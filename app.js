//Robin Luo
//game of Nottingham game
//Interactive web app to run game of Nottingham

var express = require("express");
var game = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cards = require('./resources/cards');
//var chat = require('./resources/chat');
//good
var authentication = require('./resources/authentication');

var http = require('http').Server(game);
var io = require('socket.io')(http);
//var mongodb = require('mongodb')
//var mongoClient = mongodb.MongoClient;
var ROOT = './public';


//shared resources
var leftDeck=[],rightDeck=[],leftHeap=[],rightHeap=[];
var players={};

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
	if(players.length>3){
		//if more than 3 people start game
		for(var player in players){
			console.log(player);
			//define important variables
			player.game={};
			player.game.money=50;
			player.game.hand=[];
			player.game.sachel=[];
			player.game.declared="";
			player.game.bribe=0;
			player.game.apples=0;
			player.game.cheese=0;
			player.game.bread=0;
			player.game.chicken=0;
			player.game.contraband=[];
		}
	}
	res.sendStatus(200);
});


//update
game.get('/update',function(req,res){
	var username = req.cookies.username;
	if(validate(req.cookies)){
		var details;
		details = players[username].game;
		res.json(details);
		res.sendStatus(200);
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
			if(
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
});
//put goods in bag
game.post('/transport',function(req,res){
	
});
//exchange resources
game.post('/exchange',function(req,res){
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


game.listen(2406, function(){
	console.log("Server is listening on port 2406");
});