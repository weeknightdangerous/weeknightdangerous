var http = require('http');
var express = require('express');
var axios = require('axios');
var config = require('./config');
var bodyParser = require('body-parser');
var app = express();

exports.get_trails = function(req, res) {
  
  var city = req.query.city;
  var state = req.query.state;
  // var city = 'Jackson';
  // var state = 'Wyoming';

  axios({
    method: 'get',
    url: 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]=' + city + '&q[state_cont]=' + state,
    headers: {'X-Mashape-Key': config.TRAILS.API_KEY}
  })
  .then(function(allTrails){
    //console.log('we got the data',allTrails)
    res.json(allTrails.data.places);
  })
}