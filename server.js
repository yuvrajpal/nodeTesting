var express = require('express');
var morgan = require('morgan');
// for accessing Mongo Db
var mongoose = require('mongoose');
// For parsing the data we weill send in the API request
var bodyParser = require('body-parser');
// for accessing the User model
var User = require('./models/user');
var ejs = require('ejs');
var ejsMateEngin = require('ejs-mate'); 



mongoose.connect('mongodb://root:root@ds031835.mlab.com:31835/nodetesting', function(err){
	if(err){
		console.log(err);
	} else {
		console.log('connected to the databse');
	}
})

var app = express();

/* Middlewares */ 
//-- it keeps log of all the routs that have benn tried to acces by the client
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMateEngin);
app.set('view engine', 'ejs');



app.get('/', function(req, res){
	res.render('home');
});


app.post('/create-user', function(req, res, next){
	var user = new User();

	user.profile.name = req.body.name;
	user.password = req.body.password;
	user.email = req.body.email;

	user.save(function(err){
		if(err) return next(err);

		res.json("Successfully created a new user");
	});
});

app.listen(7777, function(err){
	if(err) throw err;
	console.log("Server is running at localhost:7777");
})