//authentication.js
//simple reusable module to deal with sign up, sign in and authentication with cookies

function signin(req,res,users){
	if(req.cookies.username){
		var username = req.cookies.username;
		var password = req.cookies.password;
		if(users[username].password!=password){
			res.render('401');
		}
		res.render('index');
	}else{
		res.render('signup');
	}
}
function signup(req,res,users){
	var username = req.body.username;
	var password = req.body.password;
	if(users[username]){
		res.render('signup');
	}
	users[username]={"password":password};
	res.cookie("username",username);
	res.cookie("password",password);
	res.sendStatus(200);
}

exports.signin = signin;
exports.signup = signup;