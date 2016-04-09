var http = require('http');
var express = require('express');
var config = require('../config');
var axios = require('axios');
var utilities = require('../utility');
var app = express();

exports.geoImages = function(req, res){

  var lat = req.query.lat;
  var lon = req.query.lon;
  var dist = req.query.dist;

  axios({
    method: 'get',
    url: 'https://api.instagram.com/v1/media/search?distance=' + dist + '&lat=' + lat + '&lng=' + lon + '&client_id=' +config.INSTA.PIRATE_ID + '&count=55',
    headers: {}
  })
  .then(function(instaPics){
    res.json(utilities.cleanGrams(instaPics.data));
    //res.json(instaPics.data);
  })
}


// exports.locImages = function(req,res){
  
//   var city = req.query.city;

//   axios({
//     method: 'get',
//     url: 'https://api.instagram.com/v1/media/search?distance=5000&lat=' + lat + '&lng=' + lon + '&client_id=' + config.INSTA.PIRATE_ID,
//     headers: {}
//   })
//   .then(function(instaPics){
//     res.json(instaPics.data);
//   })
// }
