var dbhelpers = require('./database/dbhelpers')


exports.addComment =  function(req, res) {
  dbhelpers.addComment(res.locals.user.user_id, Number(req.body.trailId), req.body.comment)
    .then(function(resp) {
      res.send(resp)
    })

};

exports.checkCookie =  function(req, res) {
  console.log('cookie:', req.cookies.trailrpark)
  return dbhelpers.findUserBySession(req.cookies.trailrpark)
    .then(function(resp){
      console.log(resp)

      if (!!resp) {  
        res.locals.user = resp; 

        return true 
      }
      return false
    })
};

exports.addFav = function(req, res) {
  dbhelpers.findUserBySession(req.cookies.trailrpark)
    .then(function(user){
      return dbhelpers.addFavorite(user.user_id, req.body.trailId)

    })
    .then(function(resp){
      res.send(resp)
    })
};

exports.userFavs = function(req, res) {
  dbhelpers.findUserBySession(req.cookies.trailrpark)
    .then(function(user){
      return dbhelpers.findFavsByUserID(user.user_id)
    })
    .then(function(resp){
      res.send(resp)
    })
};













