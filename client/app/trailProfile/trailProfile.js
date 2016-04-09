var trailsApp = angular.module('trailApp.profile', [])

.controller('profileCtrl', function(showTrails, addFav, $scope, $state) {
  var profile = this;
  profile.data = {};

    //get trail info from the stored value in showTrails service by using showTrails.getTrail(); 
    profile.getTrail = function() {
      profile.data = showTrails.getTrail();
     };

    profile.addFav = function() {
      return addFav.postFav()
        .then(function (result) {
          console.log('addFavClient result:', result);
        })
        .catch(function (err) {
          console.error('addFavClient error:', err);
        })

    } 
    
    //initialize the trail data
    profile.getTrail();
})
