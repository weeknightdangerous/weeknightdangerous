var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var trails = require('./trails.js');
var ig = require('./instagram');
var db = require('./db');
var dbhelpers = require('./dbhelpers');

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
app.get('/handle_auth', ig.handleauth);

app.get('/trails/api', trails.get_trails);

// This is your 'get all trails' api call
app.get('/api/trails/alltrails', trails.allTrails);
// This is your 'get single trail' api call (requires unique_id)
app.get('/api/trails/trail', trails.singleTrails);
// This is your constrained homepage call for instagram bg images api call
app.get('/api/insta/home', ig.homeImages);
// This is your results page bg images api call
app.get('/api/insta/results', ig.resultsImages);
// This is your trail profile images api call
app.get('/api/insta/trail', ig.trailImages);

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on: ", port)
