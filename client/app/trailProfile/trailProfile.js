var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function(showTrails) {
  var profile = this;
  profile.data = {};

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     }

    profile.getTrail();
})
