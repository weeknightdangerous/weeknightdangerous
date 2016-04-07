var dbhelpers = require('./database/dbhelpers')


exports.addComment =  function(req, res) {
  dbhelpers.addComment(res.locals.userId, req.data.trailID, req.data.comment)
    .then(function(resp) {
      res.send(resp)
    })

};

exports.checkCookie =  function(req, res) {
  return dbhelpers.findUserBySession(req.cookies.trailrpark)
    .then(function(resp){
      if (!!resp[0]) {  
        res.locals.userId = resp[0]; 
        return true 
      }
      return false
    })
};

exports.addFav = function() {};

exports.userFavs = function() {};













