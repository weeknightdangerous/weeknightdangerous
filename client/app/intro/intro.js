angular.module('trailApp.intro', [])

.controller('introCtrl', function($scope, $location, $state, showTrails, imageService) {
  // run the images service so the background can load
  imageService.homeImages();

  var intro = this;

  intro.showlist = false;
  intro.data = [];

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  intro.getList = function(location) {
    console.log('showlist is working: ', location)
    //if(isValid) { 
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

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  intro.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //helper function to make sure the city and state inputed by the user are capitalized
  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

});
