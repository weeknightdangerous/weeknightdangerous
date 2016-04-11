angular.module('trailApp.intro', [])

.controller('introCtrl', function($window, showTrails, imageService) {
  // hit the images service so the background can load
  imageService.homeImages();

  var intro = this;
  var location = intro.location;

  intro.sendLocation = function(location) {
    console.log('intro sendLocation: ', location)
    showTrails.userLocation(location);
    $window.location.href = '/#/trailsList'
  }
  intro.showlist = false;
  intro.data = [];

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  intro.getList = function(location) {
    
    //console.log('showlist is working: ', location)
      //make sure the trailList header will have capitalized city and state regardless of user input.
      intro.city = capitalize(location.city);
      intro.state = capitalize(location.state);

      //get placename for bg
      var placename = {placename: intro.city + ',' + intro.state};
      imageService.locImages(placename);
      //end placename for bg

      return showTrails.getLocation(location)
      .then(function (result) {
        //show list and hide intro form
        intro.showList = true;
        intro.data = result;
      })
      .catch(function(err) {
        console.log('getLocation err: ', err);
      })
    //}
  };

});
