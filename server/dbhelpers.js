var db = require('./db')

var dbhelpers = {};

dbhelpers.addUser = function(user) {
  return db('users').insert({username: user})
    .then(function(resp){ 
      console.log("addUser response :", resp);
      return resp 
    })
};

dbhelpers.findUserByName = function(username) {
  return db('users').where({username: username})
    .then(function(resp){
      console.log("findUser response: ", resp);
      return resp
    })
};

dbhelpers.findUserBySession = function(session){
  return db('sessions').where({access_token: session})
  .then(function(resp){
    console.log("findUserBySession response: ", resp);
    return resp
  })
}

dbhelper.findFavsByUserID = function(user) {
  return db.('favs').where({uid: userID})
    .then(function(resp){
      console.log("findtrail resp: ", resp);
      return resp
    })
}



module.exports = dbhelpers;