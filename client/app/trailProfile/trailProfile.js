var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function($scope, $stateParams, showTrails) {
  var profile = this;
  var trailsId = $stateParams.trailsId;

    profile.getTrail = function() {
       showTrails.getTrail(trailsId)
        .then(function(trail) {
            console.log('profileCtrl trail: ', trail)
            profile.trail = trail;
        });
     }


    profile.getTrail();
  // showTrails.getTrail(showTrails.trailId)
  // .then(function (result) {
  //   console.log("profileCtrl trailId:", showTrails.trailId)
  //   console.log('profileCtrl result:', result);
  // })
  // .catch(function (err) {
  //   console.error('profileCtrl Error:', err);
  // })

})
