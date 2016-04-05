var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function(showTrails) {
  var profile = this;
  var fetchId = function() {
    profile.id = showTrails.trailId;
    console.log('profileCtrl fetchId:', profile.id)
    return profile.id
  }

  fetchId();

  // showTrails.getTrail(showTrails.trailId)
  // .then(function (result) {
  //   console.log("profileCtrl trailId:", showTrails.trailId)
  //   console.log('profileCtrl result:', result);
  // })
  // .catch(function (err) {
  //   console.error('profileCtrl Error:', err);
  // })

})
