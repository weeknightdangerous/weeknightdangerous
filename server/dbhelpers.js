var db = require('./db')
var uuid = require('uuid')

var dbhelpers = {};

dbhelpers.addUser = function(userObj) {
  return db('users').insert(userObj)
    .then(function(resp){ 
      console.log("addUser response :", resp);
      return resp 
    })
};

dbhelpers.findUserByName = function(username) {
  return db('users').where({username: username})
    .then(function(resp){
      console.log("findUser response: ", resp);
      return resp[0]
    })
};

dbhelpers.findUserBySession = function(session_id){
  return db('sessions').where({session_id: session})
  .then(function(resp){
    console.log("findUserBySession response: ", resp);
    return resp
  })
};

dbhelpers.findFavsByUserID = function(userID) {
  return db('favs').where({uid: userID})
    .then(function(resp){
      console.log("findtrail resp: ", resp);
      return resp
    })
};

function createSessionID (){
  return Promise.resolve(uuid.v4())
};

dbhelpers.addSession = function(userID, access_token) {
  var currentSesh;
  return createSessionID()
    .then(function(session_ID){
      currentSesh = session_ID;
      return db('sessions').insert({ 
        user_id: userID, 
        access_token: access_token, 
        session_id: session_ID
      })
    })
    .then(function(resp){
      return Object.assign({},resp, {session_id: currentSesh})
    })
  
};

dbhelpers.removeSession = function(userID) {};

dbhelpers.addComment = function(userID, comment) {};

dbhelpers.addFavorite = function(userID, trailID) {};






module.exports = dbhelpers;