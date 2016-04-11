var express = require('express');
var api = require('instagram-node').instagram();
var config = require('./config');
var app = express();
var dbhelpers = require('./database/dbhelpers');
var cookieParser = require('cookie-parser');
 

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
                  return dbhelpers.findUserByName(userObj.username)
                })
                .then(function(user){
                  return dbhelpers.addSession(user.uid, result.access_token)
                })
                .then(function(resp){
                  res.cookie('trailrpark', JSON.stringify({session_id: resp.session_id, username: userObj.full_name, image: userObj.imageUrl})).redirect('/');
                })
            } else {
              console.log("Returning User!", user);
              dbhelpers.addSession(user.uid, result.access_token)
                .then(function(resp){
                  res.cookie('trailrpark', JSON.stringify({session_id: resp.session_id, username: userObj.full_name, image: userObj.imageUrl})).redirect('/');
                  
                })   
            }
          })
    }
  });
};

 //res.cookie('trailrpark', JSON.stringify({session_id: resp.session_id, username: userObj.username})).redirect('/');
 


      