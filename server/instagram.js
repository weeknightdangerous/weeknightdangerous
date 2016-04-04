var http = require('http');
var express = require('express');
var api = require('instagram-node').instagram();
var config = require('./config');
var app = express();
var dbhelpers = require('./dbhelpers')
 
// app.configure(function() {
//   // The usual... 
// });
 // https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=
 //1965135.c1a9f0d.73ddfdeb1818469f9308b8a7a71058aa

api.use({
  client_id: config.INSTA.CLIENT_ID,
  client_secret: config.INSTA.CLIENT_SECRET
});
 
var redirect_uri = config.REDIRECT_URL;
 
exports.authorize_user = function(req, res) {
  res.redirect(api.get_authorization_url(redirect_uri, { scope: ['likes'] }));
};
 
exports.handleauth = function(req, res) {
  api.authorize_user(req.query.code, redirect_uri, function(err, result) {
    console.log(err,result)
    if (err) {
      console.log(err.body);
      res.send("Didn't work");
    } else {
        var userObj = {
          username: result.user.username,
          imageUrl: result.user.profile_picture,
          full_name: result.user.full_name
        };

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
  });
};
 


 // api.media_search(48.4335645654, 2.345645645, function(err, medias, remaining, limit) {
      //   console.log(medias)
      // });
      //api.location_search({ lat: 48.565464564, lng: 2.34656589 }, [options,] function(err, result, remaining, limit) {});
 
      //console.log('Yay! Access token is ' + result.access_token);
      //res.send('You made it!!');
 
