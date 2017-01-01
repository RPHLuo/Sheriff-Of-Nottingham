//authentication.js
//simple reusable module to deal with sign up, sign in and authentication with cookies

function signin(username,password,res,users){
	if(username){
		if(users[username].password!=password){
			res.render('401');
		}
		console.log('rendered index');
		res.render('index');
	}else{
		console.log('rendered signup');
		res.render('signup');
	}
}
function signup(req,res,users){
	var username = req.body.username;
	var password = req.body.password;
	if(users[username]){
		return false;
	}else{
		users[username]={"password":password};
		return true;
	}
}

exports.signin = signin;
exports.signup = signup;