//Robin Luo
//game of Nottingham game
//Interactive web app to run game of Nottingham

var express = require("express");
var game = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cards = require('./resources/cards');
var chat = require('./resources/chat');
var authentication = require('./resources/authentication');

var http = require('http').createServer(game);
var io = require('socket.io')(http);
chat.connect(io);
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
	//if(players.length>3){
		//if more than 3 people start game
		for(var i in players){
			console.log(i);
		}
	//}
	res.sendStatus(200);
});


//update
game.get('/update',function(req,res){
	
});

//game actions
//check them
game.post('/check',function(req,res){
	
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

//static handling
game.use(express.static(ROOT));

game.get('*',function(){
	//render 404 page
	//render(404);
});

game.listen(2406, function(){
	console.log("Server is listening on port 2406");
});