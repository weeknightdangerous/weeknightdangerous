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

dbhelpers.findUserBySession = function(session){
  return db('sessions').where({access_token: session})
  .then(function(resp){
    console.log("findUserBySession response: ", resp);
    return resp
  })
};

dbhelpers.findFavsByUserID = function(user) {
  return db('favs').where({uid: userID})
    .then(function(resp){
      console.log("findtrail resp: ", resp);
      return resp
    })
};

dbhelpers.createSessionID = function(){
  return Promise.resolve(uuid.v4())
};

dbhelpers.addSession = function(userID, access_token) {
  dbhelpers.createSessionID()
    .then(function(session_ID){
      return db('sessions').insert({ 
        user_id: userID, 
        access_token: access_token, 
        session_ID: session_ID
      })
    })
    .then(function(resp){
      console.log("addSession resp:", resp)
      return resp
    })
  
}




module.exports = dbhelpers;