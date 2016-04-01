var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var config = require('./config.js');
var path = require('path');
var ig = require('./instagram');
var db = require('./db');
var dbhelpers = require('./dbhelpers')



var app = express();


app.use(express.static(path.join(__dirname,'../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')




app.get("/", function(req, res){
	res.render('index')
})

// This is where you would initially send users to authorize 
app.get('/authorize_user', ig.authorize_user);
// This is your redirect URI 
app.get('/insta/api', ig.handleauth);























var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on: ", port)
