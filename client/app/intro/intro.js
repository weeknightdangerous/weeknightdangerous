angular.module('trailApp.intro', [])

.controller('introCtrl', function($window, showTrails, imageService) {
  // run the images service so the background can load
  imageService.homeImages();

  var intro = this;
  var location = intro.location;

  intro.sendLocation = function(location) {
    console.log('intro sendLocation: ', location)
    showTrails.userLocation(location);
    $window.location.href = '/#/trailsList'
    
  }
  

});
