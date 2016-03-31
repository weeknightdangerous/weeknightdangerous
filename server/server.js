var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var config = require('./config.js');
var path = require('path');


var app = express();


app.use(express.static(path.join(__dirname,'../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

console.log(__dirname + "../client")


app.get("/", function(req, res){
	res.render('index')
})

























var port = process.env.PORT || 3000;

app.listen(port);
console.log("Listening on: ", port)
