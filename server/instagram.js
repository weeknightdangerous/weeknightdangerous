var http = require('http');
var express = require('express');
var config = require('./config');
var app = express();

exports.geoImages = function(req, res){


        dbhelpers.findUserByName(userObj.username)
          .then(function(user){
            if(!user) {
              console.log("New User!");
              dbhelpers.addUser(userObj)
                .then(function(resp){
                  res.send(resp)
                })
            } else {
              console.log("Returning User!", user);
              dbhelpers.addSession(user.uid, result.access_token)
                .then(function(resp){
                  res.send(resp)

                  //return cookie with sessionid and also full name
                })   
            }
          })
    }
  };
};
 

  var lat = req.query.lat;
  var lon = req.query.lon;


  axios({
    method: 'get',
    url: 'https://api.instagram.com/v1/media/search?distance=5000&lat=' + lat + '&lng=' + lon + '&client_id=' + config.INSTA.PIRATE_ID,
    headers: {}
  })
  .then(function(instaPics){
    res.json(instaPics.data);
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
