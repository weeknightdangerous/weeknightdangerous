var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav, showTrails, $state, $scope, imageService) {
  var myFav = this;
  myFav.data;
  myFav.noFav = false;

  //initializes rating display array for the rating directive
  $scope.ratings = [{
        current: 0,
        max: 5
  }];

  myFav.getFavList = function() {
    //fires the loader during promise
    // console.log('myFave.getFavList is working')
    myFav.loader=true;
    //get favorite trailslist
    addFav.getFav()
      .then(function(result) {
        //console.log('getFavList client result:', result.data);      
        //turn off loader after promise is resolved
        myFav.loader=false;
        //get favorite trailslist
        myFav.data = result.data;
        //console.log('myFav.data:', myFav.data)
        //check if there's no record in myFav. if so, displays the no favorite message
        if (myFav.data.length === 0) {
          myFav.noFav = true;
        }
        // console.log('getFavList client result:', result.data);
        myFav.loader=false;
        myFav.data = result.data;
        // console.log('myFav.data:', myFav.data)
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  myFav.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    // console.log('myFav.getTrail trail:', trail)
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});
  }

  //initialize user's favorite trails list
  myFav.getFavList();

  //initialize instagram background for myFav using the generic geo list for the intro page
  imageService.getImages()
  .then(function(data){
    $scope.pics = data;
  });
   
})
