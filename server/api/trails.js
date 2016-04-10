var http = require('http');
var express = require('express');
var axios = require('axios');
var bodyParser = require('body-parser');
var config = require('../config');
var utilities = require('../utility');
var app = express();

exports.allTrails = function(req, res) {
  
  var city = req.query.city;
  var state = req.query.state;
  // var city = 'Austin';
  // var state = 'Texas';
  axios({
    method: 'get',
    url: 'https://trailapi-trailapi.p.mashape.com/?q[city_cont]=' + city + '&q[state_cont]=' + state,
    headers: {'X-Mashape-Key': config.TRAILS.API_KEY}
  })
  .then(function(allTrails){
    //console.log('we got the data',allTrails.data.places)
    //pass in '5' for hiking trails (only worrying about those for now)
    // we filter out all other trail usage in the cleanTrails utility
    var cleanData = utilities.cleanTrails(allTrails.data.places, '5');
    
    res.json(cleanData);
  })
}

exports.singleTrail = function(req, res) {
  
  var id = req.query.unique_id;
  //console.log(id)
  // var city = 'Jackson';
  // var state = 'Wyoming';
  return axios({
    method: 'get',
    url: 'https://trailapi-trailapi.p.mashape.com/?q[unique_id_eq]=' + id,
    headers: {'X-Mashape-Key': config.TRAILS.API_KEY}
  })
  .then(function(trail){
    //console.log('we got the data', trail)
    //pass in '5' for hiking trails (only worrying about those for now)
    // we filter out all other trail usage in the cleanTrails utility
    var cleanData = utilities.cleanTrails(trail.data.places, '5');
    
    return cleanData;
    
  })
}