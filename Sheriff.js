//Robin Luo
//game of Nottingham game
//Interactive web app to run game of Nottingham

var url = require('fs');
var cards = require('./resources/cards');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require("express");
var game = express();
var mongodb = require('mongodb')
var mongoClient = mongodb.MongoClient;
var ROOT = './public';
//shared resources
var leftDeck=[],rightDeck=[],leftHeap=[],rightHeap=[];
var players={};


game.set('views','./public');
game.set('view engine','pug');
app.use(bodyParser.urlencoded({extended:false}));
game.use(cookieParser());

game.get('/',function(req,res){
	if(req.cookies.username){
		var username = req.cookies.username;
		var password = req.cookies.password;
		if(!users[username]){
			//create new user
			users[username] = {"password":password};
		}else if(users[username].password != password){
			//return error
			res.sendStatus(401);
			return;
		}
		res.render('index');
	}else{
		res.render("signup");
	}
});

app.post("/signin", function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	res.cookie("username",username);
	res.cookie("password",password);
	res.sendStatus(200);
});


game.get('/start',function(req,res){
	
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
game.use(express.static(ROOT));
game.listen(2000, function(){
	console.log("Server is listening on port 2000");
});