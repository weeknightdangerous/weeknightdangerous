angular.module('trailApp.trailsList', [])

.controller('TrailsListCtrl', function (showTrails, imageService, $state) {
	var trails = this;

	trails.data = [];
  trails.city;
  trails.state;

  //to get all the trails based on user's selected city and state (collected in the location object that's passed in)
  trails.getList = function() {
    //if(isValid) { 
      // //make sure the trailList header will have capitalized city and state regardless of user input.
      // trails.city = capitalize(location.city);
      // trails.state = capitalize(location.state);
      // //get placename for bg

      // var placename = {placename: trails.city + ',' + trails.state};
      // imageService.locImages(placename);
      // //end placename for bg

      return showTrails.getTrails()
      .then(function (result) {
        console.log('trailsList ctrl result:', result)
        trails.data = result.data;
        var location = result.location;
        //make sure the trailList header will have capitalized city and state regardless of user input.
        trails.city = capitalize(location.city);
        trails.state = capitalize(location.state);
        //get placename for bg

        var placename = {placename: trails.city + ',' + trails.state};
        imageService.locImages(placename);
        //end placename for bg


      })
      .catch(function(err) {
        console.log('getLocation err: ', err);
      })
    //}
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  trails.getTrail = function(trail) {
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

  trails.getList()

});
