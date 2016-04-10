var trailsApp = angular.module('trailApp.myFav', [])

.controller('myFavCtrl', function(addFav, showTrails, $state, $scope, imageService) {
  var myFav = this;
  myFav.data;

  $scope.ratings = [{
        current: 0,
        max: 5
  }];

  myFav.getFavList = function() {
    console.log('myFave.getFavList is working')
    myFav.loader=true;
    // var data = showTrails.getTrail();
    // console.log('data', data);

    addFav.getFav()
      .then(function(result) {
        console.log('getFavList client result:', result.data);
        myFav.loader=false;
        myFav.data = result.data;
        console.log('myFav.data:', myFav.data)
      })
      .catch(function(err) {
        console.error('getFavList client error:', err);
      })
  };

  //to get the trail information from the one user clicks on through ng-click and send to the showTrails service
  myFav.getTrail = function(trail) {
    // call the service function that will store the trail in showTrails service.
    console.log('myFav.getTrail trail:', trail)
    showTrails.setTrail(trail);
    var id = trail.unique_id;
    //redirect to /trail and pass in the trail's unique_id as parameter
    $state.go('trail', { trailId: id});

    
  }

  //initialize user's favorite trails list
  myFav.getFavList();

  imageService.getImages()
  .then(function(data){
    $scope.pics = data;
  });
   
})
