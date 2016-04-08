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
      if (!!resp[0]) {  
        res.locals.user = resp[0]; 
        return true 
      }
      return false
    })
};

exports.addFav = function(req, res) {
  dbhelpers.findUserBySession(req.cookies.trailrpark)

    .then(function(user){
      return dbhelpers.addFavorite(user[0].user_id, req.body.trailId)
    })
    .then(function(resp){
      res.send(resp)
    })
};

exports.userFavs = function() {};













