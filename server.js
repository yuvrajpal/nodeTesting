var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.json("Created the Server");
});

app.listen(7777, function(err){
	if(err) throw err;
	console.log("Server is running at localhost:7777");
})