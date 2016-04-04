var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var trails = require('./trails');
var auth = require('./auth');
var db = require('./db');
var ig = require('./instagram');
var geo = require('./geocode');
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
app.get('/authorize_user', auth.authorize_user);
// This is your redirect URI 
app.get('/handle_auth', auth.handleauth);
// This is your 'get all trails' api call
app.get('/api/trails/alltrails', trails.allTrails);
// This is your 'get single trail' api call (requires unique_id)
app.get('/api/trails/trail', trails.singleTrail);
// This is your constrained homepage call for instagram bg images api call
app.get('/api/insta/geo', ig.geoImages);
// This is your results page bg images api call
app.get('/api/geo/loc', geo.geocode);
//app.get('/api/insta/loc', ig.locImages);

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on: ", port)
