var express = require('express');
var morgan = require('morgan');
// for accessing Mongo Db
var mongoose = require('mongoose');
// For parsing the data we weill send in the API request
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var flash = require('express-flash');
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
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use(express.static(__dirname + '/node_modules/jquery/dist/'));
//-- it keeps log of all the routs that have benn tried to acces by the client
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs', ejsMateEngin);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'yuvraj@!#@#@#@'
}));
app.use(flash());

var mainRoutes = require('./routes/main');
var userRoutes = require('./routes/user');

app.use(mainRoutes);
app.use(userRoutes);


app.listen(7777, function(err){
	if(err) throw err;
	console.log("Server is running at localhost:7777");
})